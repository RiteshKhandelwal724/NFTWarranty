import "../App.css";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { dateFormat, getRequestLoggedIn } from "../functions/apiClient";
import { productList } from "../endpoints";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ErrorModal from "./ErrorModal";
import moment from "moment";
import CarouselComp from "./CarouselComp";

const ProductList = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const getDataFun = async () => {
      const res = await getRequestLoggedIn(productList);
      try {
        if (res?.statusCode === "200") {
          setProductsArray(res?.productList);
          setResponse(res);
        }
      } catch (error) {
        setOpen(true);
      }
    };
    getDataFun();
  }, []);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (isExpanded, pane1) => {
    setExpanded(isExpanded ? pane1 : false);
  };
  const today = moment(new Date(), "dd-mm-yyyy");
  const noProducts = (
    <Grid
      container
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid item> No Products found</Grid>
      <Grid item>
        <Link
          variant="subtitle2"
          to="/AddProduct"
          component={RouterLink}
          sx={{ fontSize: "30px", textDecoration: "none" }}
        >
          Click to Add Product
        </Link>
      </Grid>
    </Grid>
  );
  return (
    <Grid>
      <ErrorModal
        open={open}
        setOpen={setOpen}
        errorText="No Producs found... !!!"
      />
      <Typography
        variant="h5"
        gutterBottom
        color="black"
        sx={{ fontWeight: "bold", padding: "15px 0 0 15px" }}
      >
        {productsArray.length > 0
          ? "Here is the List of your Products"
          : noProducts}
      </Typography>
      {productsArray.map((productDetails, index) => {
        const expDateRaw = productDetails?.warrantyPeriod;
        const expDate = dateFormat(expDateRaw);
        const dateOfPurchaseRaw = productDetails?.dateOfPurchase;
        const manufacturingDate = dateFormat(dateOfPurchaseRaw);
        const b = moment(today, "DD-MM-YYYY");
        const a = moment(expDate, "DD-MM-YYYY");
        //Difference in number of days
        const years = a.diff(b, "year");
        b.add(years, "years");
        const months = a.diff(b, "months");
        b.add(months, "months");
        const days = a.diff(b, "days");
        const yearsDate = years
          ? years < 0
            ? -1 * years + " years "
            : years + " years "
          : "";
        const monthsDate = months
          ? months < 0
            ? -1 * months + " months "
            : months + " months "
          : "";
        const daysDate = days
          ? days < 0
            ? -1 * days + " days"
            : days + " days"
          : "";
        const duration = yearsDate + monthsDate + daysDate;

        //Difference in number of weeks

        return (
          <Accordion
            expanded={expanded === `panel-${index}`}
            onChange={(event, isExpanded) =>
              handleChange(isExpanded, `panel-${index}`)
            }
          >
            <AccordionSummary
              id={`panel-${index}-header`}
              aria-controls={`panel-${index}-content`}
              expandIcon={<ExpandMore />}
            >
              {productDetails?.productSerialNumber}
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <CarouselComp
                  imageFile={productDetails?.productImages}
                  showDeleteButton={false}
                />

                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "15px",
                    backgroundColor: "#f5f5f5",
                    marginX: "auto",
                    width: "93vw",
                  }}
                  spacing={1}
                >
                  <Grid item>
                    <Grid
                      container
                      sx={{ display: "flex", flexDirection: "row" }}
                      spacing={1}
                    >
                      <Grid item xs={6}>
                        <strong>Product Serial Number</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {productDetails?.productSerialNumber}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Customer Email Id</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5} sx={{ wordWrap: "break-word" }}>
                        {productDetails?.userEmail}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Date of Purchase</strong>
                      </Grid>

                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {manufacturingDate}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Location of Purchase</strong>
                      </Grid>

                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {productDetails?.locatioOfPurchase}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Warranty Coverage Till</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {expDate}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Type of Warranty Coverage</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {productDetails?.typeOfWarrantyCoverage}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> Days Till Warranty Expires</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5} sx={{ color: "orange" }}>
                        <strong> {duration}</strong>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Grid>
  );
};
export default ProductList;
