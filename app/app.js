import React from "react";
import Router, { Route, DefaultRoute, NotFoundRoute, Redirect } from "react-router";

import Application from "./application";

// Layouts
import WithSubNavigation from "./layouts/WithSubNavigation";

// Pages
import NotFoundPage from "./pages/notfound";
import NullPage from "./pages/null";

import RankingsPage from "./pages/Rankings";

const container = document.getElementById("react-app");

const routes = (
  <Route handler={Application}>
    <Route name="index" path="/" handler={WithSubNavigation}>
      <DefaultRoute name="rankings" handler={RankingsPage} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, container);
});
