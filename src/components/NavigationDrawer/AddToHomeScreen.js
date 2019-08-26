import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

const AddToHomeScreen = () => {
  return (
    <>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddToHomeScreenIcon />
          </ListItemIcon>
          <ListItemText primary="Install as an app" />
        </ListItem>
      </List>
    </>
  );
};

export default AddToHomeScreen;
