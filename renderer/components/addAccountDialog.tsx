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
  const { customerPageState } = props;

  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const closeModel = props.close;
  const handleClose = () => {
    closeModel();
  };

  const formValues = {};

  const handleFormValueChange = (event) => {
    formValues[event.target.id] = event.target.value;
  };

  const handleFormSubmit = async (event) => {
    let result = await send("add_customer", formValues);
    logger.log("Add customer result:", result);
    customerPageState.update("customerListLoaded", false);
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
                // error={true}
                // helperText="Incorrect entry."
                defaultValue=""
                value={formValues["account_name"]}
                required
                autoFocus
                fullWidth
                placeholder="LinkedIn(mail@yourmail.com)"
                id="acoount_name"
                label="Account name"
                onChange={handleFormValueChange}
              />
            </Grid>
            <Grid
              container
              item
              spacing={1}
              //   style={{ border: "1px solid black" }}
            >
              <TextField
                required
                defaultValue=""
                fullWidth
                placeholder="KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD"
                value={formValues["secret"]}
                id="secret"
                label="Your key"
                onChange={handleFormValueChange}
              />
            </Grid>
            <Grid container item spacing={1}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Type of key
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={"time_based"}
                  onChange={handleChange}
                >
                  <MenuItem value={"time_based"}>Time Based</MenuItem>
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
