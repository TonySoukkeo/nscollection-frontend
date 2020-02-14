import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import BottomNavigation from "./components/navigation/BottomNavigation";
import "./css/styles.css";
import { StateContext, DispatchContext } from "./context/StateProvider";
import { SET_AUTH } from "./reducers/constants/AuthConstants";

// Components
import Home from "./layout/home/Home";
import Collection from "./layout/collection/Collection";
import Search from "./layout/search/Search";
import Profile from "./layout/profile/Profile";
import GameDisplay from "./layout/game/GameDisplay";
import Register from "./layout/auth/Register";
import ConfirmEmail from "./layout/auth/ConfirmEmail";
import Login from "./layout/auth/Login";
import Reset from "./layout/reset/Reset";

// Actions
import { setAuth } from "./reducers/actions/AuthActions";

const App = () => {
  const { authDispatch } = useContext(DispatchContext);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const validate = async () => {
        const response = await fetch(
          `http://localhost:3000/auth/validate?userId=${userId}&token=${token}`
        );

        const data = await response.json();

        if (data.status === 200) {
          setAuth(true, authDispatch);
        }
      };

      validate();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          <Route path="/register" component={Register} />
          <Route path="/game" component={GameDisplay} />
          <Route path="/confirm" component={ConfirmEmail} />
          <Route path="/login" component={Login} />
          <Route path="/reset" component={Reset} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
