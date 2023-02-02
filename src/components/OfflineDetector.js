import { Grid, Typography } from "@mui/material";
import React from "react";
import { Detector } from "react-detect-offline";
import Offline from "@mui/icons-material/SignalWifiConnectedNoInternet4";
const OfflineDetector = (props) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props?.children
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#afafaf",
              }}
            >
              <Grid item>
                <Offline sx={{ width: "100px", height: "100px" }} />
              </Grid>
              <Grid item>
                <Typography variant="h3">No Connection</Typography>
              </Grid>

              <Grid item>
                <Typography variant="h5">
                  Please check your internet connection
                </Typography>
              </Grid>
            </Grid>
          )
        }
      />
    </>
  );
};
export default OfflineDetector;
