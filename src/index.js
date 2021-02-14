import React, { lazy, Suspense, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Login = lazy(() => import("./login/_window"));
const FacebookCallback = lazy(() => import("./login/callback"));
const Home = lazy(() => import("./home/_window"));
const NewHangout = lazy(() => import("./hangout/new"));
const ShowHangout = lazy(() => import("./hangout/show"));
const EditHangout = lazy(() => import("./hangout/edit"));
const ChatIndex = lazy(() => import("./chat/index"));
const ChatShow = lazy(() => import("./chat/show"));

ReactDOM.render(
  <Router>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/auth/facebook" component={FacebookCallback} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/hangouts/new" component={NewHangout} />
          <Route
            exact
            path="/hangouts/:hangoutID/edit"
            component={EditHangout}
          />
          <Route exact path="/hangouts/:hangoutID" component={ShowHangout} />
          <Route exact path="/chats" component={ChatIndex} />
          <Route exact path="/chats/:chatID" component={ChatShow} />
          <Home exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </StrictMode>
  </Router>,
  document.getElementById("root")
);
