import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ErrorModal = ({ open, setOpen, errorText }) => {
  return (
    <Grid>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="error-title"
        aria-describedby="errror-desc"
      >
        <Grid sx={{ minWidth: "200px" }}>
          <DialogTitle
            id="error-title"
            style={{
              margin: "auto",
              textTransform: "none",
              color: "red",
              fontSize: "1.75rem",
              paddingBottom: "0",
              textAlign: "center",
            }}
          >
            Oops
          </DialogTitle>

          <DialogContent id="errror-desc">
            <Grid
              style={{
                margin: "auto",
                color: "black",
                paddingTop: "0",
                textAlign: "center",
              }}
            >
              {errorText ? (
                errorText
              ) : (
                <Grid>
                  <Grid>Something went wrong..!! </Grid>
                  <Grid>Please try again in some time.</Grid>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions
            style={{
              paddingBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              style={{
                margin: "auto",
                textTransform: "none",
              }}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default ErrorModal;
