import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { logout } from "../endpoints";
import { getRequestLoggedIn } from "../functions/apiClient";
//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "../resources/home.png";
import ContactUs from "../resources/contactUs.png";
import MyProfile from "../resources/myProfile.png";
import MyTransactions from "../resources/myTransactions.png";
import addProduct from "../resources/product.png";
import productList from "../resources/myProducts.png";
import WarrantyIcon from "../resources/warranty.png";
import CreateTokenIcon from "../resources/createTokens.png";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useToken } from "../functions/TokenUtility";
import { useAtom } from "jotai";
import {
  fromGoogleState,
  profileState,
  providerState,
  web3AuthState,
} from "../store";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "ffffff",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//search as JSX

export default function MainNavigation() {
  const [web3auth] = useAtom(web3AuthState);
  const [providers, setProvider] = useAtom(providerState);
  const [fromGoogle] = useAtom(fromGoogleState);

  const search = (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "black" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Suchen…"
        inputProps={{ "aria-label": "search" }}
        sx={{ color: "black" }}
        onChange={(e) => {
          const data = e.target.value;
          setSearchData(data);
        }}
      />
    </StyledSearch>
  );
  const logoutAuth = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const Navigate = useNavigate();
  const [token, setToken] = useToken();
  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [open, setState] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [profile] = useAtom(profileState);
  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    //changes the function state according to the value of open
    setState(open);
  };
  const logOut = async () => {
    if (fromGoogle) await logoutAuth();
    const res = await getRequestLoggedIn(logout);
    if (res?.status_code === "200") {
      setToken(0);
      Navigate("/");
    }
  };
  const reDirection = (path) => {
    toggleDrawer(false);
    Navigate(path);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "black", borderRadius: "0 0 0 30px" }}
      >
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingTop="10px"
        >
          <Grid item sx={{ minWidth: "0px" }}>
            <ListItemButton
              onClick={() => {
                Navigate(-1);
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <BackIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary="Back" />
            </ListItemButton>
          </Grid>

          <Grid item>
            <Box
              component="div"
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                },
              }}
            >
              {showSearch ? (
                <StyledSearch>
                  <ListItemButton
                    onClick={() => {
                      setShowSearch(false);
                    }}
                  >
                    <SearchIconWrapper sx={{ padding: "0" }}>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </ListItemButton>
                </StyledSearch>
              ) : (
                <Grid sx={{ backgroundColor: "white" }}>{search}</Grid>
              )}
            </Box>
          </Grid>
        </Grid>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Warranty Solutions
          </Typography>

          {/* The outside of the drawer */}
          <Drawer
            //from which side the drawer slides in
            anchor="left"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={() => toggleDrawer(false)}
            //function that is called when the drawer should open
            // onOpen={() => toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                height: 1,
                backgroundColor: "black",
              }}
            >
              {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
              <IconButton sx={{ mb: 2 }}>
                <CloseIcon
                  sx={{ color: "white" }}
                  onClick={() => toggleDrawer(false)}
                />
              </IconButton>

              <Divider sx={{ mb: 2 }} />
              <Grid
                container
                flexDirection="column"
                justifyContent="space-around"
                alignItems="flex-start"
              >
                <Grid
                  sx={{
                    p: 2,
                    height: 1,
                    backgroundColor: "gray",
                    borderRadius: "0 20px 0 0",
                  }}
                >
                  <Grid>
                    <Typography
                      color="white"
                      sx={{ fontWeight: "bold", padding: "30px 30px 0" }}
                    >
                      Ritesh Khandelwal
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      color="white"
                      sx={{ fontWeight: "bold", padding: "0 30px 30px" }}
                    >
                      {profile.roleType}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ mb: 2, mt: 5 }} item>
                  <ListItemButton
                    onClick={() => {
                      if (profile?.userRole === "2") {
                        reDirection("/RegisterProduct");
                      } else reDirection("/Dashboard");
                    }}
                  >
                    <ListItemIcon>
                      <img src={HomeIcon} alt="Home" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Home" />
                  </ListItemButton>

                  <ListItemButton
                    onClick={() => {
                      reDirection("/Profile");
                    }}
                  >
                    <ListItemIcon>
                      <img src={MyProfile} alt="MyProfile" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="My Profile"
                    />
                  </ListItemButton>

                  {profile.userRole === "2" && (
                    <ListItemButton
                      onClick={() => {
                        reDirection("/RegisteredProducts");
                      }}
                    >
                      <ListItemIcon>
                        <img src={WarrantyIcon} alt="WarrantyIcon" />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: "white" }}
                        primary="My Warranty's"
                      />
                    </ListItemButton>
                  )}
                  {profile.userRole === "2" && (
                    <ListItemButton
                      onClick={() => {
                        reDirection("/MyTransactions");
                      }}
                    >
                      <ListItemIcon>
                        <img src={MyTransactions} alt="MyTransactions" />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: "white" }}
                        primary="My Transactions"
                      />
                    </ListItemButton>
                  )}

                  <ListItemButton
                    onClick={() => {
                      reDirection("/ContactUs");
                    }}
                  >
                    <ListItemIcon>
                      <img src={ContactUs} alt="ContactUs" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="Contact Us"
                    />
                  </ListItemButton>
                  {profile.userRole === "1" && (
                    <div>
                      <ListItemButton
                        onClick={() => {
                          reDirection("/CreateTokens");
                        }}
                      >
                        <ListItemIcon>
                          <img src={CreateTokenIcon} alt="CreateTokenIcon" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "white" }}
                          primary="Create Tokens"
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => {
                          reDirection("/AddProduct");
                        }}
                      >
                        <ListItemIcon>
                          <img src={addProduct} alt="addProduct" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "white" }}
                          primary="Add Product"
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => {
                          reDirection("/ProductList");
                        }}
                      >
                        <ListItemIcon>
                          <img src={productList} alt="productList" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: "white" }}
                          primary="Products List"
                        />
                      </ListItemButton>
                    </div>
                  )}
                </Grid>

                <Grid item>
                  <Button
                    variant="text"
                    sx={{ m: 1, color: "white" }}
                    onClick={() => {
                      reDirection("/AboutUs");
                    }}
                  >
                    About Us
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    sx={{ m: 1, color: "white" }}
                    onClick={logOut}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
