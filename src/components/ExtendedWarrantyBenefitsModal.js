import {
  Backdrop,
  Button,
  Fade,
  Grid,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
const ExtendedWarrantyBenefitsModal = ({ open, setOpen, onClickHandler }) => {
  const Navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    borderRadius: "20px",
  };

  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
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
              spacing={2}
              sx={{ padding: "10px" }}
            >
              <Grid item sx={{ paddingTop: "20px" }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    lineHeight: 1.2,
                    fontSize: "15px",
                    textAlign: "left",
                    paddingTop: "20px",
                  }}
                >
                  Are you sure you dont want to Add Extended Warranty
                </Typography>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    lineHeight: 1.2,
                    fontSize: "15px",
                    textAlign: "left",
                    paddingTop: "20px",
                  }}
                >
                  Here are the Benefits you will be missing
                </Typography>
              </Grid>
              <Grid item>
                <List
                  sx={{
                    listStyleType: "disc",
                    fontWeight: "500",
                    fontSize: "15px",
                    textAlign: "left",
                    color: "black",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>Worry-Free Protection</ListItem>
                  <ListItem>
                    Service Provided by trusted Cub Cadet Dealers
                  </ListItem>
                  <ListItem>Hassle free repairs</ListItem>
                  <ListItem>Covers Mechanical/Electrical Breakdowns</ListItem>
                </List>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    lineHeight: 1.2,
                    fontSize: "15px",
                    textAlign: "left",
                    paddingTop: "10px",
                  }}
                >
                  Save Upto 25% Off on Extended Warranty for 3 years. To get the
                  benefits, Avail Now!!
                </Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    Navigate("/ExtendedWarranty");
                  }}
                  sx={{ p: "10px", width: "100%" }}
                >
                  Add extended warranty
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onClickHandler();
                  }}
                  sx={{ mt: 1, p: "10px", width: "100%" }}
                >
                  Skip Offer & Activate Warranty
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};
export default ExtendedWarrantyBenefitsModal;
