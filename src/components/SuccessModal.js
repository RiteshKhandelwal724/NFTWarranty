import { Backdrop, Button, Fade, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
const SuccessModal = ({
  open,
  handleClose,
  message,
  subMessage,
  buttonText,
  path,
  secondButtonText,
}) => {
  const Navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 240,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };
  const pathHandler = () => {
    Navigate(path);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* <DoneOutlineOutlinedIcon /> */}

          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            spacing={1}
            width="100%"
          >
            <Grid item>
              <img src="success.png" alt="success" height="45px" />
            </Grid>
            <Grid item />

            <Grid item>
              <Typography
                id="transition-modal-title"
                variant="h6"
                sx={{ fontWeight: "600", lineHeight: 1.2 }}
              >
                {message}
              </Typography>
            </Grid>
            <Grid item>
              <Typography id="transition-modal-description">
                {subMessage}
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              />
              <Grid item>
                {buttonText && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      pathHandler(path);
                    }}
                    sx={{ mt: 2, width: "100%" }}
                  >
                    {buttonText}
                  </Button>
                )}
              </Grid>
              {secondButtonText && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{ mt: 2, width: "100%" }}
                  >
                    {secondButtonText}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
export default SuccessModal;
