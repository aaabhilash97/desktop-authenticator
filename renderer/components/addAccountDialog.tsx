const logger = require("electron-timber");
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { send } from "../lib/ipc_messages";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  tab: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddAccountDialogComponent(props) {
  const { globalState } = props;

  const classes = useStyles({});
  let [formValidation, setFormValidation] = React.useState({});
  const [formValues, setFormValues] = React.useState({});

  const otpType = formValues["otp_type"] || "time_based";
  const accountName = formValues["account_name"];
  const secret = formValues["secret"];

  const closeModel = props.close;
  const handleClose = () => {
    closeModel();
  };

  const handleFormValueChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id || event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    if (!formValues["account_name"] || formValues["account_name"].length == 0) {
      setFormValidation({ ...formValidation, account_name: "Required" });
      return;
    }
    formValidation = {};
    if (!formValues["secret"] || formValues["secret"].length == 0) {
      setFormValidation({ ...formValidation, secret: "Required" });
      return;
    }
    console.log({
      secret,
      account_name: accountName,
      otp_type: otpType,
    });
    globalState.addAccount({
      secret,
      account_name: accountName,
      otp_type: otpType,
    });
    handleClose();
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid container item spacing={1}>
              <TextField
                error={formValidation["account_name"] ? true : false}
                helperText={formValidation["account_name"]}
                defaultValue=""
                required={true}
                autoFocus
                fullWidth
                placeholder="LinkedIn(mail@yourmail.com)"
                id="account_name"
                label="Account name"
                onChange={handleFormValueChange}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleFormSubmit(e);
                  }
                }}
              />
            </Grid>
            <Grid
              container
              item
              spacing={1}
              //   style={{ border: "1px solid black" }}
            >
              <TextField
                error={formValidation["secret"] ? true : false}
                helperText={formValidation["secret"]}
                required
                defaultValue=""
                fullWidth
                placeholder="KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD"
                id="secret"
                label="Your key"
                onChange={handleFormValueChange}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleFormSubmit(e);
                  }
                }}
              />
            </Grid>
            <Grid container item spacing={1}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="otp_ype">Type of key</InputLabel>
                <Select
                  labelId="Otp Type"
                  value={otpType}
                  name="otp_type"
                  onChange={handleFormValueChange}
                >
                  <MenuItem value={"time_based"}>Time Based</MenuItem>
                  <MenuItem value={"counter_based"}>Counter Based</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
