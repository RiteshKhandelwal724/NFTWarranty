import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// form
import { useFormik } from "formik";
import "../App.css";
// @mui
import { Link, TextField, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import QRScanner from "./QRScanner";
import React, { useState } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";
import { productDetailsEp } from "../endpoints";
import { useAtom } from "jotai";
import { prodData, prodImages } from "../store";
import ErrorModal from "./ErrorModal";

// components
// ----------------------------------------------------------------------

const productData = {
  productNumber: "",
};

const LoginForm = () => {
  const [product, setProduct] = useAtom(prodData);
  const [productImages, setProductImages] = useAtom(prodImages);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const productSchema = Yup.object().shape({
    productNumber: Yup.string()
      .required("Product Serial Number is required")
      .min(7, "Product Serial Number should have 7 characters")
      .max(7, "Product Serial Number should have 7 characters")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any alphanumeric character"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: productData,
      validationSchema: productSchema,
      onSubmit: async () => {
        const dataResponse = await getRequestLoggedIn(
          productDetailsEp(values.productNumber)
        );
        try {
          if (dataResponse?.statusCode === "200") {
            setProduct(dataResponse.productDetails);
            setProductImages(dataResponse.productImages);
            Navigate(
              `/ProductDescription?productId=${dataResponse?.productDetails?.productSerialNumber}`
            );
          } else {
            setOpen(true);
          }
        } catch (error) {
          setOpen(true);
        }
      },
    });
  const [QRScannerState, setQRScannerState] = useState(false);
  return (
    <Grid height="100%">
      <form style={{ height: "100%" }} onSubmit={handleSubmit}>
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorText={`Sorry, we could not find  the product with serial number ${values.productNumber}`}
        />
        <Grid
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px 20px 40px",
            height: "100%",
          }}
        >
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Grid item sx={{ width: "100%" }}>
              <Typography
                variant="h5"
                gutterBottom
                color="black"
                sx={{ fontWeight: "bold" }}
              >
                PLEASE REGISTER YOUR <br />
                PRODUCT NOW
              </Typography>
            </Grid>
            <Grid
              width="100%"
              item
              // sx={{ paddingTop: QRScannerState ? "10%" : "30%" }}
            >
              <Grid
                container
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Grid item sx={{ paddingBottom: "10px", margin: "auto" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="black"
                    sx={{ fontWeight: "bold" }}
                  >
                    Product Serial Number
                  </Typography>
                </Grid>

                <Grid item>
                  <TextField
                    id="productNumber"
                    fullWidth
                    value={values.productNumber}
                    type="productNumber"
                    name="productNumber"
                    autoComplete="off"
                    placeholder="Eg: SX324567"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    error={!!errors.productNumber && touched.productNumber}
                    helperText={
                      errors.productNumber && touched.productNumber
                        ? errors.productNumber
                        : ""
                    }
                  />
                </Grid>
                <Grid item sx={{ margin: "auto", paddingTop: "40px" }}>
                  {QRScannerState ? (
                    <QRScanner />
                  ) : (
                    <Link
                      variant="subtitle2"
                      onClick={() => {
                        setQRScannerState(true);
                      }}
                      sx={{
                        padding: "20px",
                        border: "1px solid #7e7e7e",
                        backgroundColor: "#7e7e7e",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "10px",
                      }}
                    >
                      SCAN THE QR CODE ON YOUR PRODUCT
                    </Link>
                  )}
                </Grid>
                {QRScannerState && (
                  <Grid
                    item
                    alignSelf="flex-end"
                    sx={{
                      paddingTop: "5px",
                      color: "black",
                      textAlign: "right",
                    }}
                  >
                    <Link
                      variant="subtitle2"
                      onClick={() => {
                        setQRScannerState(false);
                      }}
                      sx={{
                        color: "black",
                        textDecoration: "none",
                        borderRadius: "10px",
                      }}
                    >
                      Close QR Scanner
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item width="100%">
              <Grid
                container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                alignSelf="flex-end"
              >
                <Grid
                  sx={{
                    paddingBottom: "10px",
                  }}
                >
                  <Link variant="subtitle2" underline="hover">
                    Where Can I find The QR Code ?
                  </Link>
                </Grid>
                <Grid width="100%">
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ borderRadius: "25px", padding: "10px" }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default LoginForm;
