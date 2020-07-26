import { Icon, Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MuiAlert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { authenticator } from "otplib";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Subscribe } from "unstated";
import AddAccountDialogComponent from "../components/addAccountDialog";
import SpeedDialTooltipOpen from "../components/speeddial";
import { IsDark } from "../components/theme";
import GlobalContainer from "../containers/globalContainer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    // width: 250,
  },
  fullList: {
    width: "auto",
  },
  totpItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  primary_text: {
    userSelect: "none",
    fontSize: 20,
    color: theme.palette.primary.main,
  },
}));
function AccountItem(props) {
  const { item } = props;

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
        <ListItem button key="copy">
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Copy" />
        </ListItem>
      </List>
    </div>
  );

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
  const classes = useStyles({});
  console.log(item);
  return (
    <div key={`${item.id}`}>
      <ListItem key={`${item.id}`} className={classes.totpItem}>
        <ListItemAvatar>
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" value={80} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                style={{
                  userSelect: "none",
                  fontSize: 24,
                }}
                component="div"
                color="textSecondary"
              >
                {"G"}
              </Typography>
            </Box>
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.primary_text}>
              {item.account_name}
            </Typography>
          }
          secondary={
            <Typography
              style={{
                userSelect: "none",
                fontSize: 24,
              }}
            >
              {item.token}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
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
function HomePage(props) {
  const classes = useStyles({});
  const [enableAddNewAccountModel, setAddNewAccountModel] = React.useState(
    false
  );
  let controlActive;
  const handleAddAccountButtonClick = () => {
    setAddNewAccountModel(true);
  };
  const handleAddAccountClose = () => {
    setAddNewAccountModel(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Control") {
        controlActive = true;
        setTimeout(() => {
          controlActive = false;
        }, 500);
      } else if (controlActive && (e.key == "n" || e.key == "N")) {
        handleAddAccountButtonClick();
        controlActive = false;
      }
    });

    // Specify how to clean up after this effect:
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  });
  return (
    <Subscribe to={[GlobalContainer]}>
      {(globalState) => {
        return (
          <div className={classes.root}>
            <main className={classes.content}>
              <div>
                <List>
                  {[1, 2, 3, 4, 1, "Delete", "Copy", 1, 1, 2, 2, 4].map(
                    (text, index) => {
                      const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
                      const token = authenticator.generate(secret);
                      return (
                        <AccountItem
                          key={index}
                          item={{
                            id: index,
                            account_name: "Google(aaabhilash97@gmail.com)",
                            token: token,
                          }}
                        />
                      );
                    }
                  )}
                </List>
              </div>
              {enableAddNewAccountModel ? (
                <AddAccountDialogComponent
                  close={handleAddAccountClose}
                  customerPageState={globalState}
                />
              ) : null}
              <SpeedDialTooltipOpen
                actions={[
                  {
                    icon: <Icon>{"supervisor_account"}</Icon>,
                    name: "Add account",
                    onClick: handleAddAccountButtonClick,
                  },
                ]}
              />
              <Snackbar
                onClose={console.log.bind(null, "close")}
                open={false}
                autoHideDuration={6000}
              >
                <Alert
                  onClose={console.log.bind(null, "close")}
                  severity="success"
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            </main>
          </div>
        );
      }}
    </Subscribe>
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
