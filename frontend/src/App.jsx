import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartBet from './StartBet.jsx';
import AcceptBet from './AcceptBet.jsx';
import DecideBet from './DecideBet.jsx'; 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/start" component={StartBet} />
        <Route path="/accept" component={AcceptBet} />
        <Route path="/decide" component={DecideBet} />
      </Switch>
    </Router>
  );
};

export default App;
