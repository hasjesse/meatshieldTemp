import React from "react";
import Router, { Route, DefaultRoute, NotFoundRoute, Redirect } from "react-router";

import { Anonymous as AnonymousLayout } from "./layouts";

import Application from "./application";

import NotFoundPage from "./pages/notfound";
import NullPage from "./pages/null";

import RankingsPage from "./pages/Rankings";

const container = document.getElementById("react-app");

const routes = (
  <Route handler={Application}>
    <Route name="rankings" path="/" handler={RankingsPage}>
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Handler) => {
  React.render(<Handler/>, container);
});
