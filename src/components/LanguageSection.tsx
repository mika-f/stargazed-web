import React from "react";

import Repository from "./Repository";
import Section from "./Section";

type ExtractProps<T> = T extends React.FC<infer R> ? R : null;

type Props = {
  name: string;
  repositories: ExtractProps<typeof Repository>[];
};

const Language: React.VFC<Props> = ({ name, repositories }) => (
  <Section title={name}>
    <div>
      {repositories.map((repo) => (
        <Repository
          key={`${repo.author}/${repo.name}`}
          author={repo.author}
          description={repo.description}
          name={repo.name}
          stars={repo.stars}
        />
      ))}
    </div>
  </Section>
);

export default Language;
