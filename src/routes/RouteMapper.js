import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const RouteMapper = ({ routes, rootPath, defaultRoute }) => {
  const root = rootPath === "/" || !rootPath ? "" : rootPath;
  return (
    <Switch>
      {routes.map(({ path, render }, index) => (
        <Route key={index} path={`${root}${path}`} render={render} />
      ))}
      <Route
        path={root}
        render={() => <Redirect to={`${root}${defaultRoute}`} />}
      />
    </Switch>
  );
};

export default RouteMapper;
