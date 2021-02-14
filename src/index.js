import React, { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Login = lazy(() => import("./login/_window"));
const FacebookCallback = lazy(() => import("./login/callback"));
const Home = lazy(() => import("./home/_window"));

ReactDOM.render(
  <Router>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/auth/facebook" component={FacebookCallback} />
          <Route exact path="/login" component={Login} />
          <Home exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
