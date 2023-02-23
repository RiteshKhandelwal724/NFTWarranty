import "../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import WarrantySolutions from "./WarrantySolutions";
import { useAtom } from "jotai";
import {
  isRegistered,
  prodData,
  prodImages,
  verifyWarrantyState,
} from "../store";
import { useEffect, useState } from "react";
import RenderModal from "./RenderModal";
import moment from "moment";
import CarouselComp from "./CarouselComp";
import { dateFormat, getRequestLoggedIn } from "../functions/apiClient";
import { productDetailsEp } from "../endpoints";

const ProductDescription = () => {
  const [params, setParams] = useSearchParams();
  const productIdParam = params.get("productId");
  const [productDetails, setProductDetails] = useAtom(prodData);
  const [productImages, setProductImages] = useAtom(prodImages);
  const [verifyWarranty, setVerifyWarranty] = useAtom(verifyWarrantyState);
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const expDateRaw = productDetails?.warrantyPeriod;
  const expDate = dateFormat(expDateRaw);
  const dateOfPurchaseRaw = productDetails?.dateOfPurchase;
  const dateOfPurchase = dateFormat(dateOfPurchaseRaw);
  const today = moment(new Date(), "DD/MM/YYYY");
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
  const fetchProdDetails = async () => {
    const dataResponse = await getRequestLoggedIn(
      productDetailsEp(productIdParam)
    );
    if (dataResponse?.statusCode === "200") {
      setProductDetails(dataResponse?.productDetails);
      setProductImages(dataResponse?.productImages);
      setVerifyWarranty(dataResponse?.productDetails?.activateWarrantyFlag);
    }
  };
  useEffect(() => {
    params && fetchProdDetails();
  }, []);
  return (
    <WarrantySolutions>
      <Grid>
        <Typography
          variant="h5"
          gutterBottom
          color="black"
          sx={{ fontWeight: "bold", padding: "15px 0 0 15px" }}
        >
          Good News! This Product is already registered with us
        </Typography>
        <Grid>
          {productImages.length > 0 && (
            <CarouselComp imageFile={productImages} showDeleteButton={false} />
          )}
        </Grid>

        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          sx={{ padding: "15px" }}
          spacing={1}
        >
          <Grid item>
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={6}>
                <strong>Product Serial Number</strong>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                {productDetails.productSerialNumber}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={6}>
                <strong>Purchase Date</strong>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                {dateOfPurchase}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={6}>
                <strong> Location of Purchase for the Product</strong>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                {productDetails.locatioOfPurchase}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={6}>
                <strong> Warranty Coverage Till</strong>
              </Grid>

              <Grid item xs={1}></Grid>
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
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                {productDetails.typeOfWarrantyCoverage}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container display="flex" flexDirection="row">
              <Grid item xs={6}>
                <strong> Days Till Warranty Expires</strong>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={5} sx={{ color: "orange" }}>
                <strong> {duration}</strong>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ padding: "20px 10px 0" }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ padding: "10px" }}
            onClick={() => {
              Navigate("/ExtendedWarranty");
            }}
          >
            Add extended Warranty
          </LoadingButton>
        </Grid>
        <Grid sx={{ padding: "10px" }}>
          {verifyWarranty !== "1" && (
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ padding: "10px" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Activate Warranty
            </LoadingButton>
          )}
          <RenderModal
            open={open}
            setOpen={setOpen}
            openSuccess={openSuccess}
            setOpenSuccess={setOpenSuccess}
          />
        </Grid>
      </Grid>
    </WarrantySolutions>
  );
};
export default ProductDescription;
