import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import clsx from "clsx";
import List from "@material-ui/core/List";

import ListItemIcon from "@material-ui/core/ListItemIcon";

import DeleteIcon from "@material-ui/icons/Delete";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  totpItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

function HomePage(props) {
  const classes = useStyles({});
  const [state, setState] = React.useState({
    top: false,
    bottom: false,
  });
  const anchor = "top";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Delete", "Copy"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <List className={classes.root}>
        {["Delete", "Copy", 1, 1, 2, 2, 4].map((text, index) => (
          <ListItem key={index} className={classes.totpItem}>
            <ListItemAvatar>
              <Avatar>{"E"}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  style={{ userSelect: "none", fontSize: 15, color: "black" }}
                >
                  Google(aaabhilash97@gmail.com)
                </Typography>
              }
              secondary={
                <Typography
                  style={{ userSelect: "none", fontSize: 24, color: "#4e7be2" }}
                >
                  124 456
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="start" aria-label="progress">
                <CircularProgress variant="static" value={100} />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

HomePage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default HomePage;
