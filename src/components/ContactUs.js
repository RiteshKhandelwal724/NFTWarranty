import "../App.css";
import { Grid, Link, Typography } from "@mui/material";
import headquarters from "../resources/headquarters.png";

const ContactUs = () => {
  return (
    <Grid>
      <Typography
        variant="h5"
        gutterBottom
        color="black"
        sx={{ fontWeight: "bold", padding: "15px 0 0 25px" }}
      >
        Contact <Link href="/">warrantyMarket.com</Link>
      </Typography>
      <Grid sx={{ margin: "auto", width: "80%" }}>
        <img src={headquarters} alt="headQuarters" />
      </Grid>

      <Typography
        variant="h5"
        gutterBottom
        color="black"
        sx={{ fontWeight: "500", padding: "15px 0 0 25px" }}
      >
        Address:
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        color="black"
        sx={{ fontWeight: "500", padding: "15px 0 0 25px", fontSize: "15px" }}
      >
        102 NE 2nd Street #217 Boca Raton,
        <br /> FL 33432-3908
        <br />
        <strong>Email:</strong> contact@warrantyMarket.com
        <br />
        <strong>Phone:</strong> (888) 694-6735
      </Typography>
    </Grid>
  );
};
export default ContactUs;
