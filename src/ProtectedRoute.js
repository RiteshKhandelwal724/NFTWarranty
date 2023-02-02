import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "./endpoints";
import NotFoundPage from "./components/NotFoundComponent";
import { useToken } from "./functions/TokenUtility";
import { getData } from "./functions/apiClient";
import { useAtom } from "jotai";
import { profileState } from "./store";
export const ProtectedRoute = (props) => {
  const [token] = useToken();
  const [currentStep, setCurrentStep] = useState("0");
  const [profile, setProfile] = useAtom(profileState);
  const allowedRoutesForManufacturer = [
    "/",
    "/Login",
    "/AddProduct",
    "/CreateTokens",
    "/ProductList",
    "/Profile",
    "/ContactUs",
    "/AboutUs",
    "/ProductDescription",
    "/Dashboard",
  ];
  const allowedRoutesForCustomer = [
    "/",
    "/RegisterProduct",
    "/RegisteredProducts",
    "/ExtendedWarranty",
    "/ProductDescription",
    "/Profile",
    "/ContactUs",
    "/AboutUs",
    "/MyTransactions",
  ];
  useEffect(() => {
    sessionStorage.setItem("previousPath", window.location.pathname);
    const getVerification = async () => {
      const res = await getData(verifyUser(token));
      if (res.status_code === "200") {
        setProfile(res.data);
        setCurrentStep("1");
      } else {
        setCurrentStep("2");
      }
    };
    getVerification();
  }, []);
  if (currentStep === "0") {
    return null; //show loader
  } else if (currentStep === "1") {
    const matchManufacturerArray = allowedRoutesForManufacturer.filter(
      (path) => window.location.pathname.startsWith(path) === true
    );
    const matchCustomerArray = allowedRoutesForCustomer.filter(
      (path) => window.location.pathname.startsWith(path) === true
    );

    if (profile?.userRole === "1") {
      if (matchManufacturerArray.length > 1) {
        return <React.Fragment>{props.children}</React.Fragment>;
      } else return <NotFoundPage />;
    } else if (profile?.userRole === "2") {
      if (matchCustomerArray.length > 1) {
        return <div>{props.children}</div>;
      } else return <NotFoundPage />;
    }
  } else if (currentStep === "2") {
    return <Navigate to="/" />;
  }
};
export default ProtectedRoute;
