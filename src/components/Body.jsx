import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Map from './Map';

class Body extends React.Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/map" exact component={Map}></Route>
            <Route path="/about" exact component={About}></Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default Body;
