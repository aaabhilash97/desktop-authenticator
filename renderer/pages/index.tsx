import { Icon, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

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

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Subscribe } from "unstated";
import AddAccountDialogComponent from "../components/addAccountDialog";
import SpeedDialTooltipOpen from "../components/speeddial";
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
    padding: theme.spacing(0.4),
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
  const { item, globalState } = props;

  const copyToClipboard = (token) => {
    navigator.clipboard.writeText(token);
    globalState.setAlertMessage("Otp Copied", "success");
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
        <ListItem
          button
          key="copy"
          onClick={() => {
            copyToClipboard(item.token);
          }}
        >
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
  return (
    <div key={`${item.id}`}>
      <ListItem
        key={`${item.id}`}
        className={classes.totpItem}
        onDoubleClick={() => {
          copyToClipboard(item.token);
        }}
      >
        <ListItemAvatar>
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" value={item.progress} />
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
            <Tooltip title={item.account_name}>
              <Typography className={classes.primary_text}>
                {item.account_name.length > 30
                  ? item.account_name.slice(0, 30) + "..."
                  : item.account_name}
              </Typography>
            </Tooltip>
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
      {(globalState: any) => {
        return (
          <div className={classes.root}>
            <main className={classes.content}>
              <div>
                <List>
                  {globalState.state.accounts.map((account, index) => {
                    return (
                      <AccountItem
                        globalState={globalState}
                        key={index}
                        item={{
                          id: index,
                          account_name: account.account_name,
                          token: account.token,
                          otp_type: account.otp_type,
                          progress: account.progress,
                        }}
                      />
                    );
                  })}
                </List>
              </div>
              {enableAddNewAccountModel ? (
                <AddAccountDialogComponent
                  close={handleAddAccountClose}
                  globalState={globalState}
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
              {globalState.state.alertMessage ? (
                <Snackbar
                  onClose={globalState.setAlertMessage.bind(
                    globalState,
                    "",
                    ""
                  )}
                  open={true}
                  autoHideDuration={2000}
                >
                  <Alert
                    onClose={globalState.setAlertMessage.bind(
                      globalState,
                      "",
                      ""
                    )}
                    severity={globalState.state.alertMessageLevel}
                  >
                    {globalState.state.alertMessage}
                  </Alert>
                </Snackbar>
              ) : null}
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
