import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Login from './pages/Login';
import Room from './pages/Room';
import Test from './pages/Test';
import Project from './pages/Project';
import Tag from './pages/Tag';
import Door from './pages/Door';
import Account from './pages/Account';
import Password from './pages/Password';
import { logoutUser, getUserData } from './actions';
import { SET_AUTHENTICATED } from './actions/types';
import requiresAuth from './utils/requiresAuth';
import { history } from './utils/history';

axios.defaults.baseURL = 'https://us-central1-social-pomo-94112.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/overview" component={requiresAuth(Overview)} />
        <Route exact path="/account" component={requiresAuth(Account)} />
        <Route exact path="/password" component={requiresAuth(Password)} />
        <Route exact path="/room" component={requiresAuth(Door)} />
        <Route exact path="/room/:roomname" component={Room} />
        <Route exact path="/test/:roomname" component={Test} />
        <Route exact path="/project" component={requiresAuth(Project)} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
