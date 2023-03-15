import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Grid } from "@mui/material";

const steps = [
  "Initiating",
  "Waiting for confirmation",
  "Transaction complete",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TransactionModal = ({ response, setStart, buttonText, modalClose }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const domData = response?.error ? response.error.receipt : response;
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          <Stepper activeStep={domData ? 3 : 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <center>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginTop: 30 }}
            >
              {domData ? (
                domData?.status ? (
                  <b style={{ color: "green" }}>Transaction complete</b>
                ) : (
                  <b style={{ color: "red" }}>Transaction failed</b>
                )
              ) : (
                "Waiting for confirmation"
              )}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {domData
                ? "Transactions request complete."
                : "Transactions have been initiated. Waiting for confirmation."}
            </Typography>
            {domData && (
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transaction hash"
                    secondary={
                      <React.Fragment>
                        <Grid
                          sx={{
                            wordWrap: "break-word",
                          }}
                        >
                          <a
                            href={`https://goerli.etherscan.io/tx/${domData?.transactionHash}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {domData?.transactionHash}
                          </a>
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {/* <Divider variant="middle" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block hash"
                    secondary={
                      <React.Fragment>
                        <Grid
                          sx={{
                            wordWrap: "break-word",
                          }}
                        >
                          {domData?.blockHash}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem> */}
                {/* <Divider variant="middle" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block number"
                    secondary={
                      <React.Fragment>
                        <Grid
                          sx={{
                            wordWrap: "break-word",
                          }}
                        >
                          {domData?.blockNumber}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem> */}
                <Divider variant="middle" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transaction from"
                    secondary={
                      <React.Fragment>
                        <Grid
                          sx={{
                            wordWrap: "break-word",
                          }}
                        >
                          {domData?.from}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transaction to"
                    secondary={
                      <React.Fragment>
                        <Grid
                          sx={{
                            wordWrap: "break-word",
                          }}
                        >
                          {domData?.to}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
              </List>
            )}
            {domData ? (
              <Grid>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={(e) => modalClose()}
                    style={{ marginTop: 20, width: "100%" }}
                  >
                    {buttonText}
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={(e) => handleClose()}
                    style={{ marginTop: 20, width: "100%" }}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            ) : response?.error?.code === 4001 ? (
              <>
                <p style={{ color: "red", marginTop: 20 }}>
                  {response?.error?.message}
                </p>
                <Button
                  variant="contained"
                  onClick={(e) => handleClose()}
                  style={{ marginTop: 20 }}
                >
                  Close
                </Button>
              </>
            ) : (
              <CircularProgress style={{ marginTop: 30 }} />
            )}
          </center>
        </Box>
      </Modal>
    </div>
  );
};
export default TransactionModal;
