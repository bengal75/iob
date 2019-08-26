import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";

// See https://material-ui.com/guides/composition/#react-router

const ListItemLink = ({ icon, primary, secondary, to }) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} ref={ref} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export default ListItemLink;
