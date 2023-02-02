import * as Yup from "yup";
import { useFormik } from "formik";
import "../App.css";
import { Stack, TextField, Grid, Typography, Button } from "@mui/material";
import { mintHandler } from "../functions/blockChainFunctions";
import { useAtom } from "jotai";
import { warrantyContractState } from "../store";
import { useState } from "react";
import TransactionModal from "./TransactionModal";
import { postRequestLoggedIn } from "../functions/apiClient";
import { addToken } from "../endpoints";
import { useNavigate } from "react-router-dom";

const data = {
  createTokens: "",
};
const CreateTokens = () => {
  const Navigate = useNavigate();
  const [warrantyContract] = useAtom(warrantyContractState);
  const [start, setStart] = useState(false);
  const [responseState, setResponseState] = useState();
  const tokenSchema = Yup.object().shape({
    createTokens: Yup.string()
      .required("Enter the Number of Tokens to be Minted")
      .matches(/^[0-9]*$/, "Must contain any digits"),
  });
  const onClickHandler = () => {
    setStart(true);
    const tokNum = Number(values.createTokens);
    const tokenArray = Array(tokNum).fill(0);
    tokenArray.map(async () => {
      const response = await mintHandler(warrantyContract);
      const tokenId = parseInt(response?.events[0]?.args?.tokenId._hex, 16);

      if (response) {
        postRequestLoggedIn(addToken, { tokenId });
        setResponseState(response);
      }
      values.createTokens = "";
    });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: data,
      validationSchema: tokenSchema,
      onSubmit: () => {
        try {
          onClickHandler();
        } catch (e) {
          alert("something went wrong");
        }
      },
    });
  const modalClose = () => {
    setStart(false);
    Navigate("/AddProduct");
  };

  return (
    <Grid sx={{ padding: "12px" }}>
      {start && (
        <TransactionModal
          modalClose={modalClose}
          buttonText="Go to Add product"
          response={responseState}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Grid
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5">Create Tokens</Typography>

          <Stack spacing={3} sx={{ paddingTop: "20px" }}>
            <TextField
              id="createTokens"
              fullWidth
              value={values.createTokens}
              type="text"
              name="createTokens"
              autoComplete="off"
              placeholder="Enter Number of Tokens"
              onChange={handleChange}
              variant="standard"
              onBlur={handleBlur}
              error={!!errors.createTokens && touched.createTokens}
              helperText={
                errors.createTokens && touched.createTokens
                  ? errors.createTokens
                  : ""
              }
              label="Enter Number of Tokens"
            />
          </Stack>
        </Grid>

        <Grid sx={{ paddingTop: "20px", width: "100%", margin: "auto" }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ padding: "10px", borderRadius: "25px" }}
          >
            Create Tokens
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};
export default CreateTokens;
