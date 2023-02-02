import "../App.css";
import { Grid, Typography } from "@mui/material";
import WarrantySolutions from "./WarrantySolutions";
import { useAtom } from "jotai";
import { profileState } from "../store";

const Profile = () => {
  const [profile] = useAtom(profileState);
  return (
    <WarrantySolutions>
      <Grid>
        <Typography
          variant="h5"
          gutterBottom
          color="black"
          sx={{ fontWeight: "bold", padding: "15px 0 0 25px" }}
        >
          Here is your Profile....
        </Typography>
        <Grid sx={{ padding: "10px 20px 20px" }}>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            sx={{
              padding: "15px",
              border: "2px solid black",
              borderRadius: "20px",
              backgroundColor: "#d9ddd7",
            }}
          >
            <Grid item>
              <Grid container display="flex" flexDirection="row">
                <Grid item xs={5}>
                  <strong> Name:</strong>
                </Grid>
                <Grid item xs={7}>
                  {"Ritesh Khandelwal"}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container display="flex" flexDirection="row">
                <Grid item xs={5}>
                  <strong>Phone Number:</strong>
                </Grid>
                <Grid item xs={7}>
                  {profile.userPhone}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container display="flex" flexDirection="row">
                <Grid item xs={5}>
                  <strong> Email Address:</strong>
                </Grid>

                <Grid
                  item
                  xs={7}
                  sx={{
                    wordWrap: "break-word",
                  }}
                >
                  {profile.userEmail}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container display="flex" flexDirection="row">
                <Grid item xs={5}>
                  <strong> Role:</strong>
                </Grid>
                <Grid item xs={7}>
                  {profile.roleType}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WarrantySolutions>
  );
};
export default Profile;
