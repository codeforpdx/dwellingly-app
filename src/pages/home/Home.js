import React from "react";
import { Route, Link } from "react-router-dom";
import AppComponent from "../../components/app/App";
import CounterComponent from "../../components/counter/Counter";

const Home = () => (
  <div className="home">
    <header>
      <Link to="/">
        Home
      </Link>
      &nbsp;
      <Link to="/counter">
        Conter
      </Link>
    </header>
    <main>
      <Route exact path="/" component={ AppComponent } />
      <Route exact path="/counter" component={ CounterComponent } />
    </main>
  </div>
);

export default Home;
