/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import marked from "marked";
import useFetch from "use-http";
import { decode } from "utf8";

import Container from "../components/Container";
import Repository from "../components/Repository";
import Select from "../components/Select";
import Virtualized from "../components/Virtualized";

type ExtractProps<T> = T extends React.VFC<infer R> ? R : null;

type UnwrapArray<T> = T extends Array<infer R> ? R : null;

type Language = {
  name: string;
  repositories: ExtractProps<typeof Repository>[];
};

type Languages = Language[];

type Repositories = ExtractProps<typeof Repository>[];

type Selections = ExtractProps<typeof Select>["selections"];

type Response = {
  content: string;
};

const htmlToRepositories = (html: string): Languages => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  const toc = document.querySelector("h2[id$='-contents']")?.nextElementSibling;
  const languages: Languages = [];

  toc?.querySelectorAll("a")?.forEach((w) => {
    const href = w.getAttribute("href") as string;
    const lang = w.text.match(/(?<lang>.*)\s\(\d+\)/)?.groups?.lang;
    if (lang === undefined) {
      return;
    }

    const repositories: Repositories = [];
    const repos = document.querySelector(`h2${href}`)?.nextElementSibling;
    repos?.querySelectorAll("tbody > tr").forEach((tr) => {
      const elem = tr.querySelectorAll("td");
      const repo: UnwrapArray<Repositories> = {
        author: elem[3].textContent!,
        description: elem[2].textContent!,
        name: elem[1].querySelector("a")?.textContent!,
        stars: parseInt(elem[4].textContent ?? "0", 10),
        language: lang,
      };

      repositories.push(repo);
    });

    languages.push({ name: lang, repositories });
  });

  return languages;
};

const Stargazed: React.VFC = () => {
  const [repository, setRepository] = useState<string>("");
  const [languages, setLanguages] = useState<Languages>([]);
  const [selections, setSelections] = useState<Selections>([]);
  const { get, response, loading, error } = useFetch("https://api.github.com");

  const onSubmit = async () => {
    const { content } = (await get(`/repos/${repository}/contents/README.md`)) as Response;
    if (response.ok) {
      const markdown = decode(atob(content));
      const html = marked.parse(markdown);

      setLanguages(htmlToRepositories(html));
    }
  };

  const onTextChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setRepository(value);
  };

  const onSelectionChanged = (newSelections: Selections) => {
    setSelections(newSelections);
  };

  const isEnableSubmit = () => repository !== "" && repository.split("/").length === 2;

  const hasContents = repository !== "" && languages.length > 0;
  const items = languages.map((w) => ({ label: w.name, value: w.name }));
  const repositories = selections.flatMap((w) => {
    const language = languages.find((v) => v.name === w.value)!;
    return language.repositories;
  });

  return (
    <Container>
      <div className="w-full text-center">
        {hasContents ? (
          <div>
            <h1 className="text-4xl mt-8 mb-16">Stargazed Web</h1>
            <Select items={items} selections={selections} onSelectionChanged={onSelectionChanged} />
            <div className="px-4 text-left">
              <Virtualized repositories={repositories} />
            </div>
          </div>
        ) : (
          <div className="mx-auto" style={{ maxWidth: "580px" }}>
            <h1 className="text-6xl mt-72 mb-16">Stargazed Web</h1>
            <div className="w-full flex">
              {loading ? (
                <div className="text-center">Please wait while loading...</div>
              ) : (
                <>
                  <input
                    className="flex-grow w-full bg-gray-100 text-gray-800 rounded-l h-12 p-2 outline-none focus:outline-none"
                    type="text"
                    placeholder="type your stargazed repository such as mika-f/awesome-stars"
                    onChange={onTextChanged}
                    value={repository}
                  />
                  <button
                    onClick={onSubmit}
                    onKeyPress={onSubmit}
                    disabled={!isEnableSubmit()}
                    type="submit"
                    className="bg-blue-100 text-white h-12 py-2 px-4 rounded-r outline-none hover:bg-blue-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Stargazed;
