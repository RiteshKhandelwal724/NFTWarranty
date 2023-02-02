import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterProduct from "./components/RegisterProduct";
import Login from "./components/Login";
import ProductDescription from "./components/ProductDescription";
import ExtendedWarranty from "./components/ExtendedWarranty";
import RegisteredProducts from "./components/RegisteredProducts";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "./components/AddProduct";
import CreateTokens from "./components/CreateTokens";
import WarrantySolutions from "./components/WarrantySolutions";
import ConnectBlockChain from "./components/ConnectBlockChain";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/About";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/MyTransactions";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/RegisterProduct"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <ConnectBlockChain />
                <RegisterProduct />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ContactUs"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <ContactUs />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/MyTransactions"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <Transactions />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/AboutUs"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <AboutUs />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/RegisteredProducts"
          element={
            <ProtectedRoute>
              <RegisteredProducts />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ExtendedWarranty"
          element={
            <ProtectedRoute>
              <ExtendedWarranty />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ProductDescription"
          element={
            <ProtectedRoute>
              <ConnectBlockChain />
              <ProductDescription />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/AddProduct"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <ConnectBlockChain />
                <AddProduct />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <Dashboard />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/CreateTokens"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <ConnectBlockChain />
                <CreateTokens />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/ProductList"
          element={
            <ProtectedRoute>
              <WarrantySolutions>
                <ConnectBlockChain />
                <ProductList />
              </WarrantySolutions>
            </ProtectedRoute>
          }
        />

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Routes>
    );
  }
}

export default Routing;
