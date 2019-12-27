import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBarAndDrawer from "../components/AppBarAndDrawer";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function HomePage(props) {
  const classes = useStyles({});
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <AppBarAndDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>HomePage for susu.</Typography>
      </main>
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
  )
};

export default HomePage;
