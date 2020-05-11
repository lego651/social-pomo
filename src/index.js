import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";

import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./store";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Test from "./pages/Test";
import Project from "./pages/Project";
import Tag from "./pages/Tag";
import Home from "./pages/Home";
import Door from "./pages/Door";
import Account from "./pages/Account";
import Password from "./pages/Password";
import Match from "./pages/Match";
import NotFound from "./pages/NotFound";
import { logoutUser, getUserData } from "./actions";
import { SET_AUTHENTICATED } from "./actions/types";
import requiresAuth from "./utils/requiresAuth";
import { history } from "./utils/history";
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.baseURL =
  "https://us-central1-pomopal-dev.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken.exp);
  // console.log(Date.now())
  if (decodedToken.exp * 1000 + 4 * 60 * 60 * 1000 < Date.now()) {
    // console.log("logout called...");
    store.dispatch(logoutUser());
    localStorage.removeItem("FBIdToken");
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={requiresAuth(Dashboard)} />
          <Route exact path="/account" component={requiresAuth(Account)} />
          <Route exact path="/password" component={requiresAuth(Password)} />
          <Route exact path="/room" component={requiresAuth(Door)} />
          <Route exact path="/room/:roomname" component={requiresAuth(Room)} />
          <Route exact path="/test/:roomname" component={Test} />
          <Route exact path="/project" component={requiresAuth(Project)} />
          <Route exact path="/match" component={requiresAuth(Match)} />
          <Route exact path="/tag" component={requiresAuth(Tag)} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
