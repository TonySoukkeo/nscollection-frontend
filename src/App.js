import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import BottomNavigation from "./components/navigation/BottomNavigation";
import "./css/styles.css";

// Components
import Home from "./layout/home/Home";
import Collection from "./layout/collection/Collection";
import Search from "./layout/search/Search";
import Profile from "./layout/profile/Profile";
import GameDisplay from "./layout/game/GameDisplay";
import Register from "./layout/auth/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <BottomNavigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/collection" component={Collection} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Route path={"/register"} component={Register} />
          <Route path="/game" component={GameDisplay} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
