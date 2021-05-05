import React from "react";

type Props = {
  name: string;
  description: string;
  author: string;
  stars: number;
};

const Repository: React.VFC<Props> = ({ author, description, name, stars }) => (
  <div className="w-full text-left border-b border-gray-300 py-2 my-2">
    <h3 className="text-xl text-blue-500">
      <a href={`https://github.com/${author}/${name}`} target="_blank" rel="noopener noreferrer">
        {author}/{name}
      </a>
    </h3>
    <div className="text-gray-600">{description}</div>
    <div className="text-sm text-gray-400">{stars} Stars</div>
  </div>
);

export default Repository;
