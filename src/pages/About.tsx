import React from "react";

import Container from "../components/Container";
import Section from "../components/Section";

const About: React.VFC = () => (
  <Container>
    <Section title="About Website">
      <p>
        stargazed.mochizuki.io is a web application for rendering and searching repositories of <code>README.md</code>{" "}
        in your repository that generated and updated by stargazed.
      </p>
      <p>You can browse and search starred repositories with a lightweight and beautiful UI.</p>
    </Section>
    <Section title="Why?">
      For example, if you have thousands of repository registered to README.md, like my
      <a className="mx-1" href="https://github.com/mika-f/awesome-stars" target="_blank" rel="noopener noreferrer">
        awesome-stars
      </a>
      repository, browsing a single file on GitHub can be a burden to your browser. It&apos;s also a hassle to clone and
      pull from GitHub just for that. So I created this web application.
    </Section>
  </Container>
);

export default About;
