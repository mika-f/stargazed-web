import React from "react";

type Props = {
  title: string;
};

const Section: React.FC<Props> = ({ children, title }) => (
  <section className="mt-6 mb-4">
    <h2 className="text-3xl mb-2">{title}</h2>
    <div>{children}</div>
  </section>
);

export default Section;
