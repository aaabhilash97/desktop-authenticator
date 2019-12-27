import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

import AppBarAndDrawer from "../../components/AppBarAndDrawer";
import SpeedDialTooltipOpen from "../../components/speeddial";
import AddCustomer from "../../components/addCustomer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function NewCustomer(props) {
  const [enableAddCustomerModel, setAddCustomerModel] = React.useState(false);

  const handleAddCustomerButtonClick = () => {
    setAddCustomerModel(true);
  };
  const handleAddCustomerClose = () => {
    setAddCustomerModel(false);
  };
  const classes = useStyles({});
  const theme = useTheme();
  let addCustomerModel;
  let controlActive;

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key == "Control") {
        controlActive = true;
        setTimeout(() => {
          controlActive = false;
        }, 500);
      } else if (controlActive && (e.key == "n" || e.key == "N")) {
        handleAddCustomerButtonClick();
        controlActive = false;
      }
    });

    // Specify how to clean up after this effect:
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  });

  if (enableAddCustomerModel) {
    addCustomerModel = <AddCustomer close={handleAddCustomerClose} />;
  }
  return (
    <div className={classes.root}>
      <AppBarAndDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>List customer page.</Typography>
        {addCustomerModel}
        <SpeedDialTooltipOpen
          actions={[
            {
              icon: <Icon>{"person_add"}</Icon>,
              name: "Add customer",
              onClick: handleAddCustomerButtonClick
            }
          ]}
        />
      </main>
    </div>
  );
}

NewCustomer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default NewCustomer;
