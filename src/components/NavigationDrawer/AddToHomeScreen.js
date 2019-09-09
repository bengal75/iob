import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

const AddToHomeScreen = ({ installEvent }) => {
  const install = () => {
    installEvent.deferredPrompt.prompt();
    installEvent.updateDeferredPrompt(null);
  };
  const isRunningStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  return (
    !isRunningStandalone &&
    installEvent.deferredPrompt && (
      <>
        <Divider />
        <List>
          <ListItem button onClick={install}>
            <ListItemIcon>
              <AddToHomeScreenIcon />
            </ListItemIcon>
            <ListItemText primary="Install as an app" />
          </ListItem>
        </List>
      </>
    )
  );
};

export default AddToHomeScreen;
