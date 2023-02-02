// form
import "../App.css";
// @mui
import { Grid, Slider, Typography } from "@mui/material";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import WarrantySolutions from "./WarrantySolutions";
import { useAtom } from "jotai";
import {
  priceValue,
  prodData,
  registeredProductResponse,
  warrantyContractState,
} from "../store";
import { dateFormat, postRequestLoggedIn } from "../functions/apiClient";
import { userExtendWarranty } from "../endpoints";
// import PaymentSuccess from "./PaymentSuccess";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  addDataClickHandler,
  getMetaData,
} from "../functions/blockChainFunctions";
import moment from "moment";
import TransactionModal from "./TransactionModal";

// components
// ----------------------------------------------------------------------

const ExtendedWarranty = () => {
  const [productData] = useAtom(prodData);
  const tokenId = parseInt(productData?.tokenId);
  const [value, setValue] = useAtom(priceValue);
  const [warrantyContract] = useAtom(warrantyContractState);
  const [response, setResponse] = useAtom(registeredProductResponse);
  const handleChange = (event, newvalue) => {
    setValue(newvalue);
  };
  const [open, setOpen] = useState(false);
  const [responseState, setResponseState] = useState();

  const [transactionId, setTransactionId] = useState("");

  const Navigate = useNavigate();
  const marks = [
    { value: 0, label: "1 Year" },
    { value: 50, label: "2 Year" },
    { value: 100, label: "3 Year" },
  ];

  const valueFun = (value) => {
    if (value === 0) {
      return "1 Year";
    } else if (value === 50) {
      return "2 Years";
    } else if (value === 100) {
      return "3 Years";
    }
  };
  const amountValue = value ? value * 60 : 1000;

  const options = {
    key: "rzp_test_eqYzhY3qydcfV7",
    amount: `${amountValue * 100}`,
    name: "Ritesh Shop",
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: async function (response) {
      let bodyData = {};
      if (response) {
        bodyData = {
          productId: productData.productSerialNumber,
          quantity: `${value === 100 ? 3 : value === 50 ? 2 : 1}`,
          amount: `${amountValue}`,
          rzrpayPayId: response.razorpay_payment_id,
        };
      }
      setOpen(true);
      const resp = await addDataClickHandler(
        warrantyContract,
        tokenId,
        JSON.stringify(bodyData)
      );
      let tokenAssigned = {};
      if (resp) {
        tokenAssigned = JSON.parse(
          await getMetaData(warrantyContract, tokenId)
        );
        if (tokenAssigned) {
          const resData = await postRequestLoggedIn(
            userExtendWarranty,
            bodyData
          );
          if (resData?.status_code === "200") {
            setResponse(resData);
            setResponseState(resp);
            setTransactionId(resData?.transactionID);
          }
        }
      } else {
      }
    },
    prefill: {
      name: "Gaurav",
      contact: "9999999999",
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const pathHandler = () => {
    setOpen(false);
    Navigate("/RegisteredProducts");
  };
  const handleClose = () => setOpen(false);
  const expDateRaw = productData?.warrantyPeriod;
  const expDate = dateFormat(expDateRaw);
  const dateUpdated = moment(expDate, "DD-MM-YYYY")
    .add("years", value === 100 ? 3 : value === 50 ? 2 : 1)
    .format("DD-MM-YYYY");
  return (
    <WarrantySolutions>
      {open && (
        <TransactionModal
          response={responseState}
          modalClose={() => {
            setOpen(false);
            Navigate("/RegisteredProducts");
          }}
          buttonText="Go to My Registered Warranty's"
        />
      )}

      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        sx={{ padding: "10px" }}
      >
        <Grid item>
          <Typography
            variant="h5"
            gutterBottom
            color="black"
            sx={{ fontWeight: "bold", padding: "15px 0 0 15px" }}
          >
            How Much Extended Warranty You Be Needing?
          </Typography>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                color="#777b7e"
                sx={{ fontSize: "15px", padding: "20px 0 0", margin: 0 }}
              >
                Please Select The Duration
              </Typography>
            </Grid>
            <Grid item sx={{ width: "80%" }}>
              <Slider
                value={value}
                onChange={handleChange}
                marks={marks}
                step={null}
                sx={{ color: "orange" }}
              />
            </Grid>
            <Grid item sx={{ color: "orange", padding: "15px 0" }}>
              <Typography
                variant="h5"
                gutterBottom
                color="orange"
                sx={{ fontWeight: "bold" }}
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <RupeeIcon />
                  </Grid>
                  <Grid item>
                    <strong>{value === 0 ? 1000 : value * 60}</strong>
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid sx={{ padding: "0 10px 10px", width: "100%" }}>
              <Grid
                container
                flexDirection="column"
                justifyContent="center"
                sx={{ padding: "15px", backgroundColor: "#FFF1D7" }}
              >
                <Grid sx={{ fontSize: "25px" }}>
                  <strong>{valueFun(value)}</strong>
                </Grid>

                <Grid item sx={{ paddingTop: "30px" }}>
                  <Grid container display="flex" flexDirection="row">
                    <Grid item xs={6}>
                      <strong>Price</strong>
                    </Grid>
                    <Grid item xs={1} />

                    <Grid item xs={5}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <RupeeIcon />
                        </Grid>
                        <Grid item>
                          <strong>{value === 0 ? 1000 : value * 60}</strong>
                        </Grid>
                      </Grid>
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
                      <strong>{dateUpdated}</strong>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ paddingTop: "20px" }}>
                  <Grid container display="flex" flexDirection="row">
                    <Grid item xs={6}>
                      <strong> Type of Warranty Coverage</strong>
                    </Grid>
                    <Grid item xs={1} />

                    <Grid item xs={5}>
                      <strong>{productData.typeOfWarrantyCoverage} </strong>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            sx={{ padding: "10px 10px 0" }}
            onClick={() => openPayModal(options)}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ padding: "10px" }}
            >
              {/* <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/payment"
              >
                Pay Now
              </Link> */}
              Pay Now
            </LoadingButton>
          </Grid>
        </Grid>
        {false ? (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  {/* <DoneOutlineOutlinedIcon /> */}

                  <Grid
                    container
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    spacing={1}
                  >
                    <Grid item>
                      <img src="success.png" alt="success" height="45px" />
                    </Grid>
                    <Grid item />

                    <Grid item>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        sx={{ fontWeight: "600", lineHeight: 1.2 }}
                      >
                        Your Payment is Successful
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography id="transition-modal-description">
                        Please check your email for the payment receipt
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography id="transition-modal-description">
                        <strong>Transaction Id is {transactionId}</strong>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={pathHandler}
                        sx={{ mt: 2 }}
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            </Modal>
          </>
        ) : (
          ""
        )}
      </Grid>
    </WarrantySolutions>
  );
};
export default ExtendedWarranty;
