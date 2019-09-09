import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemLink from "./ListItemLink";
import AddToHomeScreen from "./AddToHomeScreen";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/ViewList";
import SettingsIcon from "@material-ui/icons/Settings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawer: ({ drawerWidth, open }) => ({
    width: open ? drawerWidth : 0,
    flexShrink: 0,
  }),
  drawerPaper: ({ drawerWidth }) => ({
    width: drawerWidth,
  }),
  toolbar: theme.mixins.toolbar,
}));

const navItems = [
  { primary: "Home", secondary: "", icon: <HomeIcon />, to: "/" },
  { primary: "Doses", secondary: "", icon: <ListIcon />, to: "/doses" },
  {
    primary: "Settings",
    secondary: "",
    icon: <SettingsIcon />,
    to: "/settings",
  },
];

const NavigationDrawer = ({ drawerWidth, open, toggle, installEvent }) => {
  const classes = useStyles({ drawerWidth, open });
  const theme = useTheme();
  const isMinSmScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const toggler = isMinSmScreen ? undefined : toggle;

  return (
    <nav className={classes.drawer} aria-label="navigation menu">
      <Drawer
        variant="persistent"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={open}
        onClose={toggle}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {navItems.map(item => (
            <ListItemLink {...item} key={item.primary} toggler={toggler} />
          ))}
        </List>
        <AddToHomeScreen installEvent={installEvent} />
      </Drawer>
    </nav>
  );
};

export default NavigationDrawer;
