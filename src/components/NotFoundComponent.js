import { Typography, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { profileState } from "../store";
import WarrantySolutions from "./WarrantySolutions";
const NotFoundPage = () => {
  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: "100vw",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 0),
    height: "100vh",
  }));
  const [profile] = useAtom(profileState);
  const Navigate = useNavigate();
  return (
    <WarrantySolutions>
      <ContentStyle>
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ paddingTop: "100px" }}
        >
          <Grid item sm={12}>
            <Typography variant="h4" color="red">
              Page Not found
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h4" color="red">
              Or
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h4" color="red">
              Invalid Access
            </Typography>
          </Grid>
          <Grid item sm={12} sx={{ paddingTop: "30px" }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Typography variant="h6">
                  Click to navigate to the dashboard
                </Typography>
              </Grid>
              <Button
                onClick={() => {
                  profile?.userRole === "1"
                    ? Navigate("/Dashboard")
                    : Navigate("/RegisterProduct");
                }}
              >
                Navigate to Dashboard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ContentStyle>
    </WarrantySolutions>
  );
};
export default NotFoundPage;
