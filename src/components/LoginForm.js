import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useFormik } from "formik";
import "../App.css";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { postData } from "../functions/apiClient";
import { login } from "../endpoints";
import ErrorModal from "./ErrorModal";
const loginData = {
  email: "",
  password: "",
  remember: true,
};

const LoginForm = ({ setToken }) => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .max(12, "Password can be maximum of 12 characters")
      .required("Password is required")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(
        /^(?=.*[!@#$%&])/,
        "Must contain at least one special character"
      ),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginData,
      validationSchema: LoginSchema,
      onSubmit: async () => {
        try {
          const res = await postData(login, values);
          if (res?.statusCode === "200") {
            setToken(res?.data?.userToken);
            if (res?.data?.userRole === "2") {
              if (
                sessionStorage.getItem("previousPath") &&
                sessionStorage
                  .getItem("previousPath")
                  .startsWith("/ProductDescription")
              ) {
                Navigate(sessionStorage.getItem("previousPath"));
              } else Navigate("/RegisterProduct");
            } else Navigate("/Dashboard");
          } else if (res.statusCode === "400") {
            setModalView(true);
            setErrorLogin(res?.message || res?.errormessage);
          }
        } catch (e) {
          alert("something went wrong");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <ErrorModal
        open={modalView}
        setOpen={setModalView}
        errorText={errorLogin}
      />
      <Grid
        sx={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "12px",
        }}
      >
        <Stack spacing={3} sx={{ paddingTop: "20px" }}>
          <TextField
            id="email"
            fullWidth
            value={values.email}
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={handleChange}
            variant="standard"
            onBlur={handleBlur}
            error={!!errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : ""}
          />

          <TextField
            id="password"
            fullWidth
            value={values.password}
            name="password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.password && touched.password}
            variant="standard"
            helperText={
              errors.password && touched.password ? errors.password : ""
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  ></IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2, padding: "10px 0 0" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={handleChange}
                  sx={{ color: "#d04a02 ! important" }}
                />
              }
              name="remember"
              label="Remember me"
            />
          </FormGroup>
          <Link variant="subtitle2" underline="hover" sx={{ color: "black" }}>
            Forgot Password?
          </Link>
        </Stack>
      </Grid>

      <Grid sx={{ paddingTop: "20px" }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ padding: "10px", borderRadius: "25px" }}
        >
          Login
        </LoadingButton>
      </Grid>
    </form>
  );
};
export default LoginForm;
