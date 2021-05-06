import React, { useEffect, useRef } from "react";
import { useVirtual } from "react-virtual";

import Repository from "./Repository";

type ExtractProps<T> = T extends React.VFC<infer R> ? R : null;

type Repositories = ExtractProps<typeof Repository>[];

type Props = {
  repositories: Repositories;
};

const Virtualized: React.VFC<Props> = ({ repositories }) => {
  const parentRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const size = useRef<number>();
  const virtual = useVirtual({
    size: repositories.length,
    parentRef,
  });

  useEffect(() => {
    const onResize = () => {
      size.current = window.innerHeight;
    };

    size.current = window.innerHeight;
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <div className="overflow-auto" style={{ height: `${size.current! - 348}px` }} ref={parentRef}>
      <div className="relative" style={{ height: `${virtual.totalSize}px` }}>
        {virtual.virtualItems.map((row) => {
          const repository = repositories[row.index];

          return (
            <Repository
              key={`${repository.author}/${repository.name}`}
              author={repository.author}
              description={repository.description}
              language={repository.language}
              name={repository.name}
              stars={repository.stars}
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${row.start}px)` }}
              reference={row.measureRef}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Virtualized;
