import React from "react";

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => (
  <div className={`container w-full mx-auto px-4 ${className}`}>{children}</div>
);

export default Container;
