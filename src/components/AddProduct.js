import * as Yup from "yup";
import { useFormik } from "formik";
import "../App.css";
import {
  Stack,
  TextField,
  Grid,
  Typography,
  CardActions,
  CardMedia,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import { warrantyContractState } from "../store";
import React, { useState } from "react";
import { useAtom } from "jotai";
import moment from "moment";
import {
  addDataClickHandler,
  getMetaData,
  mintHandler,
} from "../functions/blockChainFunctions";
import { useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import { postRequestLoggedIn } from "../functions/apiClient";
import { addEditProduct } from "../endpoints";
import CarouselComp from "./CarouselComp";
import addImageIcon from "../resources/addProduct.png";

const productDetails = {
  productSerialNumber: "",
  locationOfPurchase: "",
  typeOfWarrantyCoverage: "",
  userEmail: "",
};

const AddProduct = () => {
  const [base64Image, setBase64Image] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const handleFileUpload = () => {
    hiddenFileInput.current.click();
  };
  const [imageFile, setImageFile] = useState([]);
  const Navigate = useNavigate();
  const [qrVisible, setQrVisible] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [responseState, setResponseState] = useState();
  const [addProductData, setAddProductData] = useState({});
  const [purchaseDate, setpurchaseDate] = useState(null);
  const [purchaseError, setPurchaseError] = useState("");

  const [expirationDate, setExpirationDate] = useState(null);
  const [expirationError, setExpirationError] = useState("");

  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const [warrantyContract] = useAtom(warrantyContractState);
  const [start, setStart] = useState(false);

  const deleteHandler = (file) => {
    setImageFile(
      imageFile.filter((e, index) => {
        if (e === file) {
          setBase64Image(
            base64Image.filter((eInner, indexInner) => {
              return indexInner !== index;
            })
          );
        }
        return e !== file;
      })
    );
  };
  const productValidation = Yup.object().shape({
    productSerialNumber: Yup.string()
      .required("Product Serial Number is required")
      .min(7, "Product Serial Number should have 7 characters")
      .max(7, "Product Serial Number should have 7 characters")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any alphanumeric character"),

    locationOfPurchase: Yup.string()
      .required("Location Of Purchase is Required")
      .min(3, "Location of Purchase should atleast have 3 characters")
      .matches(
        /^[a-zA-Z]*$/,
        "Must not contain any digits or special characters"
      ),

    typeOfWarrantyCoverage: Yup.string()
      .required("Type of Warranty coverage is Required")
      .min(3, "Location of Purchase should atleast have 3 characters")
      .matches(
        /^[a-zA-Z]*$/,
        "Must not contain any digits or special characters"
      ),
    userEmail: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });
  const handleFocusFun = () => {
    setFocus(true);
    setPurchaseError("");
  };
  const handleBlurFun = () => {
    setFocus(false);
    if (!purchaseDate) setPurchaseError("Enter the Purchase date");
  };
  const handleFocusFunction = () => {
    setFocus2(true);
    setExpirationError("");
  };
  const handleBlurFunction = () => {
    setFocus2(false);
    if (!expirationDate) setExpirationError("Enter the Expiration date");
  };
  const submitFun = async (data) => {
    setButtonClicked(true);
    if (!(purchaseDate && expirationDate)) {
    } else {
      setStart(true);
      //setAddProductsData([...addProductsData, data]);
      const responseMint = await mintHandler(warrantyContract);
      const tokenId = parseInt(responseMint?.events[0]?.args?.tokenId._hex, 16);
      if (!tokenId) {
        setStart(false);
        return;
      }
      const dataResp = await addDataClickHandler(
        warrantyContract,
        tokenId,
        JSON.stringify(data)
      );

      const resp = await getMetaData(warrantyContract, tokenId);
      let productData = JSON.parse(resp);
      const updateDateFunction = (date) => {
        return moment(date, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD");
      };
      const product = (productData = {
        ...productData,
        tokenId: `${tokenId}`,
        dateOfPurchase: updateDateFunction(purchaseDate),
        warrantyPeriod: updateDateFunction(expirationDate),
        locatioOfPurchase: productData.locationOfPurchase,
        productImages: base64Image,
      });

      const res = await postRequestLoggedIn(addEditProduct, product);
      if (res?.status_code === "200") {
        // setOpen(true);
        setResponseState(dataResp);
        setQrVisible(true);
        setAddProductData(
          `https://warrantynft.netlify.app/ProductDescription?prodId=${values.productSerialNumber}`
        );
        setpurchaseDate("");
        setExpirationDate("");
        values.locationOfPurchase = "";
        values.productSerialNumber = "";
        values.typeOfWarrantyCoverage = "";
        setQrVisible(true);
      }
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: productDetails,
      validationSchema: productValidation,
      onSubmit: async (data) => {
        submitFun(data);
      },
    });
  const changeHandler = async (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imageArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImageFile([...imageFile, ...imageArray]);
    selectedFilesArray.map(async (file) => {
      let arr = [];
      const base64 = await convertBase64(file);
      arr.push(base64.substring(22));
      setBase64Image([...base64Image, ...arr]);
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const modalClose = () => {
    setStart(false);
    Navigate("/ProductList");
  };
  return (
    <Grid sx={{ padding: "20px" }}>
      {start && (
        <TransactionModal
          response={responseState}
          modalClose={modalClose}
          buttonText="Go to Product List"
        />
      )}
      <form onSubmit={handleSubmit}>
        <Typography variant="h5">Add Product Detail</Typography>
        {imageFile.length > 0 && (
          <Typography sx={{ fontWeight: "600", paddingTop: "10px" }}>
            Preview Uploaded Images
          </Typography>
        )}

        <Grid>
          {imageFile.length > 0 && (
            <CarouselComp
              imageFile={imageFile}
              showDeleteButton
              deleteHandler={deleteHandler}
            />
          )}
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <>
            <CardActions onClick={handleFileUpload}>
              <CardMedia
                component="img"
                image={addImageIcon}
                sx={{ width: "75px", margin: "auto", paddingTop: "10px" }}
              />
            </CardActions>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ margin: "auto", fontWeight: "bold" }}>
                Add Product Images
              </Typography>
            </Grid>
            <input
              type={"file"}
              id={"productImage"}
              ref={hiddenFileInput}
              style={{ display: "none" }}
              accept="image/png,image/jpg"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "10px 0",
          }}
        >
          <Stack spacing={3}>
            <TextField
              id="productSerialNumber"
              fullWidth
              value={values.productSerialNumber}
              type="text"
              name="productSerialNumber"
              autoComplete="off"
              placeholder="Product Serial Number"
              onChange={handleChange}
              variant="standard"
              onBlur={handleBlur}
              error={
                !!errors.productSerialNumber && touched.productSerialNumber
              }
              helperText={
                errors.productSerialNumber && touched.productSerialNumber
                  ? errors.productSerialNumber
                  : ""
              }
              label="Enter Product Serial Number"
            />
            <DatePicker
              label="Enter the Date of Purchase"
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    id="dateOfPurchase"
                    name="dateOfPurchase"
                    variant="standard"
                    onBlur={handleBlurFun}
                    onFocus={handleFocusFun}
                    error={purchaseError || (buttonClicked && !purchaseDate)}
                    helperText={
                      purchaseError ||
                      (buttonClicked &&
                        !purchaseDate &&
                        " Please enter the Purchase Date")
                    }
                  />
                );
              }}
              value={purchaseDate}
              inputFormat={"DD/MM/YYYY"}
              onChange={(val) => {
                setpurchaseDate(val);
              }}
              disableFuture
            />
            <TextField
              id="locationOfPurchase"
              fullWidth
              value={values.locationOfPurchase}
              type="text"
              name="locationOfPurchase"
              autoComplete="off"
              placeholder="Location Of Purchase"
              onChange={handleChange}
              variant="standard"
              onBlur={handleBlur}
              error={!!errors.locationOfPurchase && touched.locationOfPurchase}
              helperText={
                errors.locationOfPurchase && touched.locationOfPurchase
                  ? errors.locationOfPurchase
                  : ""
              }
              label="Enter the Location Of Purchase"
            />
            <DatePicker
              label="Enter the Warranty Coverage date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  onBlur={handleBlurFunction}
                  onFocus={handleFocusFunction}
                  error={expirationError || (buttonClicked && !expirationDate)}
                  helperText={
                    expirationError ||
                    (buttonClicked &&
                      !expirationDate &&
                      "Enter the Expirattion date")
                  }
                />
              )}
              value={expirationDate}
              inputFormat={"DD/MM/YYYY"}
              onChange={(val) => {
                setExpirationDate(val);
              }}
              disablePast
            />

            <TextField
              id="typeOfWarrantyCoverage"
              fullWidth
              value={values.typeOfWarrantyCoverage}
              type="text"
              name="typeOfWarrantyCoverage"
              autoComplete="off"
              placeholder="Type Of Warranty Coverage"
              onChange={handleChange}
              variant="standard"
              onBlur={handleBlur}
              error={
                !!errors.typeOfWarrantyCoverage &&
                touched.typeOfWarrantyCoverage
              }
              helperText={
                errors.typeOfWarrantyCoverage && touched.typeOfWarrantyCoverage
                  ? errors.typeOfWarrantyCoverage
                  : ""
              }
              label="Enter the Type Of Warranty Coverage"
            />
            <TextField
              id="userEmail"
              fullWidth
              value={values.userEmail}
              type="email"
              name="userEmail"
              autoComplete="off"
              placeholder="Customer Email Id"
              onChange={handleChange}
              variant="standard"
              onBlur={handleBlur}
              error={!!errors.userEmail && touched.userEmail}
              helperText={
                errors.userEmail && touched.userEmail ? errors.userEmail : ""
              }
              label="Customer Email Id"
            />
          </Stack>
        </Grid>

        <Grid sx={{ paddingTop: "20px", width: "100%", margin: "auto" }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              setButtonClicked(true);
            }}
            style={{ padding: "10px", borderRadius: "25px" }}
          >
            Add Details
          </LoadingButton>
        </Grid>
      </form>
    </Grid>
  );
};
export default AddProduct;
