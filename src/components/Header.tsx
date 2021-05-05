import React from "react";
import { Link } from "react-router-dom";

import Container from "./Container";

const Header: React.VFC = () => (
  <header className="bg-gray-100 h-14 flex flex-col justify-center">
    <Container>
      <div className="w-full flex flex-row">
        <Link to="/">Stargazed Web</Link>
        <div className="flex-grow flex flex-row-reverse">
          <a className="mx-2" href="https://github.com/mika-f/stargazed-web" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link to="/about" className="mx-2">
            About
          </Link>
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
