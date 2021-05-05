import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// @ts-ignore
import nightwind from "nightwind/helper";

import "./app.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Stargazed from "./pages/Stargazed";

const App: React.VFC = () => (
  <Router>
    <HelmetProvider>
      <div className="bg-gray-50 text-black min-h-screen flex flex-col">
        <Helmet>
          <title>stargazed.mochizuki.io</title>
          {/* eslint-disable-next-line react/no-danger */}
          <script type="text/javascript">{nightwind.init()}</script>
        </Helmet>
        <Header />
        <div className="h-full flex-grow">
          <Switch>
            <Route path="/" exact>
              <Stargazed />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  </Router>
);

export default App;
