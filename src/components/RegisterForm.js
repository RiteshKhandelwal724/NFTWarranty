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
// components
// ----------------------------------------------------------------------

const loginData = {
  email: "",
  password: "",
  remember: true,
};

const LoginForm = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      onSubmit: () => {
        Navigate("/dashboard");
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        sx={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px 20px 40px",
        }}
      >
        <Stack spacing={3} sx={{ paddingTop: "20px" }}>
          <TextField
            id="email"
            label="Email"
            fullWidth
            value={values.email}
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : ""}
          />

          <TextField
            id="password"
            label="Enter Password"
            fullWidth
            value={values.password}
            name="password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.password && touched.password}
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
              control={<Checkbox defaultChecked onChange={handleChange} />}
              name="remember"
              label="Remember me"
            />
          </FormGroup>
          <Link variant="subtitle2" underline="hover">
            Forgot password ?
          </Link>
        </Stack>
      </Grid>

      <Grid sx={{ paddingTop: "20px" }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ padding: "20px", borderRadius: "25px" }}
        >
          Login
        </LoadingButton>
      </Grid>
    </form>
  );
};
export default LoginForm;
