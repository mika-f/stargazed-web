import React from "react";

import Container from "./Container";

const Footer: React.VFC = () => (
  <footer>
    <Container>
      <div className="pt-4 pb-8 text-center text-gray-600">
        <div className="text-center">Copyright &copy; 2021 Natsuneko. All Rights Reserved.</div>
        <div className="text-center">
          stargazed.mochizuki.io is inspired by
          <a
            href="https://github.com/abhijithvijayan/stargazed"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1"
          >
            abhijithvijayan/stargazed
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
