import React from "react";
import HomePage from "./HomePage";
import DosesPage from "./DosesPage";
import SettingsPage from "./SettingsPage";
import RouteMapper from "./RouteMapper";

const routes = [
  {
    path: "/home",
    render: ({ match }) => <HomePage />,
  },
  {
    path: "/doses",
    render: ({ match }) => <DosesPage />,
  },
  {
    path: "/settings",
    render: ({ match }) => <SettingsPage />,
  },
];

const RootRoute = ({ match }) => (
  <RouteMapper routes={routes} rootPath={match.path} defaultRoute="/home" />
);

export default RootRoute;
