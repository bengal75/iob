import React from "react";
import HomePage from "./HomePage";
import DosesPage from "./DosesPage";
import SettingsPage from "./SettingsPage";
import RouteMapper from "./RouteMapper";

const routes = [
  {
    path: "/doses",
    render: ({ match }) => <DosesPage />,
  },
  {
    path: "/settings",
    render: ({ match }) => <SettingsPage />,
  },
  {
    path: "/home",
    render: ({ match }) => <HomePage />,
  },
  {
    path: "/",
    render: ({ match }) => <HomePage />,
  },
];

const RootRoute = ({ match }) => (
  <RouteMapper routes={routes} rootPath={match.path} defaultRoute="/" />
);

export default RootRoute;
