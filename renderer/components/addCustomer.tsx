import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

export default function AddCustomer(props) {
  const handleClose = () => {
    props.close();
  };

  const [formValues, setFormValues] = React.useState({});

  const handleFormValueChange = event => {
    formValues[event.target.id] = event.target.value;
    setFormValues(formValues);
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item md={4} sm={6} xs={12}>
              <TextField
                // error={true}
                // helperText="Incorrect entry."
                required
                autoFocus
                fullWidth
                id="name"
                label="Customer name"
                onChange={handleFormValueChange}
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Customer Email"
                type="email"
              />
            </Grid>
            <Grid container item md={4} sm={6} xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                defaultValue="+91"
                label="Customer Phone number"
                placeholder="+919895774319"
                type="text"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
