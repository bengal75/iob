import React, { useEffect } from "react";
import RootRoute from "./routes/RootRoute";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import NavigationDrawer from "./components/NavigationDrawer/";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RouteMapper from "./routes/RouteMapper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "./assets/logo192.png";

const routes = [
  {
    path: "/",
    render: ({ match }) => <RootRoute match={match} />,
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    flexGrow: 1,
    backgroundColor: theme.colour.snow,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "3rem",
    maxWidth: "192px",
    backgroundColor: theme.colour.snow,
    borderRadius: "10%",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
  routeContainer: ({ navDrawerOpen, drawerWidth }) => ({
    boxSizing: "border-box",
    flexGrow: 1,
    height: "100%",
    paddingLeft: navDrawerOpen
      ? theme.spacing(3) + drawerWidth
      : theme.spacing(3),
  }),
}));

const App = () => {
  const theme = useTheme();

  const [navDrawerOpen, setNavDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => setNavDrawerOpen(!navDrawerOpen);

  const classes = useStyles({
    drawerWidth: theme.navDrawerWidth,
    navDrawerOpen,
  });

  const isMinSmScreen = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    if (isMinSmScreen) setNavDrawerOpen(true);
  }, [isMinSmScreen]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open navigation menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <img className={classes.logo} src={logo} alt="" />
          <Typography variant="h6" className={classes.title}>
            Insulin on Board
          </Typography>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        drawerWidth={theme.navDrawerWidth}
        open={navDrawerOpen}
        toggle={handleDrawerToggle}
      />
      <Container className={classes.routeContainer}>
        <RouteMapper routes={routes} defaultRoute="/" />
      </Container>
    </div>
  );
};

export default App;
