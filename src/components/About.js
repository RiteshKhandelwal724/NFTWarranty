import "../App.css";
import { Grid, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const Navigate = useNavigate();
  return (
    <Grid>
      <Typography
        variant="h5"
        gutterBottom
        color="black"
        className="qwerty"
        sx={{ fontWeight: "bold", padding: "15px 0 0 15px" }}
      >
        About{" "}
        <Link
          onClick={() => {
            Navigate("/");
          }}
        >
          warrantyMarket.com
        </Link>
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        color="black"
        sx={{
          fontWeight: "500",
          padding: "5px 15px 15px",
          fontSize: "15px",
        }}
      >
        WarrantyMarket.com is the world's best online store for the purchase of
        super-premium .Com domain names. WarrantyMarket.com was established over
        a decade ago to provide a platform for great marketers and business
        owners to purchase the highest quality undeveloped Internet real estate
        brands (premium .Com domains.) WarrantyMarket.com has a long track
        record having sold, developed, codeveloped, or otherwise provided the
        starting point for some of the most powerful brands on the internet.
        Some of our success stories include Phone.com, SEO.com, Software.com,
        WebDevelop.com, BandCamp.com, and Skateboards.com. All these names or
        sites originated right here at WarrantyMarket.com. If you are looking to
        put a new brand online or already have an existing brand that needs a
        boost, we encourage you to search our inventory. At WarrantyMarket.com,
        you will find an efficient, trustworthy marketplace for the purchase of
        premium domain name brands for your emerging business.
      </Typography>
    </Grid>
  );
};
export default AboutUs;
