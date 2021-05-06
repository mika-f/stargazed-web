import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faStar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  description: string;
  author: string;
  language: string;
  stars: number;

  className?: string;
  style?: React.CSSProperties;
  reference?: (el: HTMLDivElement | null) => void;
};

const Repository: React.VFC<Props> = ({ author, description, name, language, stars, className, style, reference }) => (
  <div
    className={`w-full text-left border-b border-gray-300 py-2 my-2 ${className}`}
    style={style}
    ref={(el) => {
      if (reference) {
        reference(el);
      }
    }}
  >
    <h3 className="text-xl text-blue-500 whitespace-nowrap overflow-ellipsis overflow-x-hidden">
      <a href={`https://github.com/${author}/${name}`} target="_blank" rel="noopener noreferrer">
        {author}/{name}
      </a>
    </h3>
    <div className="text-gray-600 my-1">
      {description ? (
        <p>{description}</p>
      ) : (
        <p>
          <i>No description provided.</i>
        </p>
      )}
    </div>
    <div className="text-sm text-gray-400 flex flex-row">
      <div className="mr-2">
        <FontAwesomeIcon icon={faCode} className="mr-1" />
        {language}
      </div>
      <div>
        <FontAwesomeIcon icon={faStar} className="mr-1" />
        {stars}
      </div>
    </div>
  </div>
);

export default Repository;
