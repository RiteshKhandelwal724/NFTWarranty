import React from "react";
import Routes from "./Routes";
import "./App.css";
// import OfflineDetector from "./components/OfflineDetector";
// import TopBar from "./Layout/TopBar";

// import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
// import AdminLayout from "./Admin/Layout";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Routes />
      </LocalizationProvider>
    </>
  );
};

export default App;
