import {
  Grid,
  Typography,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WarrantySolutions from "./WarrantySolutions";
import image from "../resources/washermachine.jpg";
import ExpandMore from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { dateFormat, getRequestLoggedIn } from "../functions/apiClient";
import { userProductList } from "../endpoints";
import ErrorModal from "./ErrorModal";
import CarouselComp from "./CarouselComp";
import QRCode from "react-qr-code";
const RegisteredProducts = () => {
  const [expanded, setExpanded] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);

  const [open, setOpen] = useState(false);

  const handleChange = (isExpanded, pane1) => {
    setExpanded(isExpanded ? pane1 : false);
  };
  const today = moment(new Date(), "DD/MM/YYYY");
  useEffect(() => {
    const getDataFun = async () => {
      const res = await getRequestLoggedIn(userProductList);
      try {
        if (res?.statusCode === "200") {
          setProductsArray(res?.productList);
          setResponseMessage(res?.message);
          if (res?.productList.length === 0) {
            setOpen(true);
          }
        } else {
          setOpen(true);
        }
      } catch (error) {
        setOpen(true);
      }
    };
    getDataFun();
  }, []);
  return (
    <WarrantySolutions>
      <ErrorModal open={open} setOpen={setOpen} errorText={responseMessage} />
      <Typography
        variant="h5"
        gutterBottom
        color="black"
        sx={{ fontWeight: "bold", padding: "15px 0 0 15px", height: "10%" }}
      >
        All My Registered <br /> Warranty's
      </Typography>

      {productsArray.map((productDetails, index) => {
        const expDateRaw = productDetails?.warrantyPeriod;
        const expDate = dateFormat(expDateRaw);
        const dateOfPurchaseRaw = productDetails?.dateOfPurchase;
        const dateOfPurchase = dateFormat(dateOfPurchaseRaw);
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
                <Grid>
                  <CarouselComp
                    imageFile={productDetails?.productImages}
                    showDeleteButton={false}
                  />
                </Grid>
                <Grid
                  container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{
                    padding: "15px",
                    backgroundColor: "#f5f5f5",
                    marginX: "auto",
                    width: "93vw",
                  }}
                  spacing={1}
                >
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
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
                        <strong> Date of Purchase</strong>
                      </Grid>

                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        {dateOfPurchase}
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
                  <Grid item>
                    <Grid container display="flex" flexDirection="row">
                      <Grid item xs={6}>
                        <strong> QR Code</strong>
                      </Grid>
                      <Grid item xs={1} />

                      <Grid item xs={5}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <QRCode
                            value={`https://warrantynft.netlify.app/ProductDescription?productId=${productDetails?.productSerialNumber}`}
                            size={50}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </WarrantySolutions>
  );
};

export default RegisteredProducts;
