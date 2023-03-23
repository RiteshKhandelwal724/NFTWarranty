import React, { useState, useEffect } from "react";
import T1 from "../resources/T1.png";
import T2 from "../resources/T2.png";
import T3 from "../resources/T3.png";
import T4 from "../resources/T4.png";
import DashAvatarIcon from "../resources/DashAvatarIcon.png";
import { visuallyHidden } from "@mui/utils";
import { NavLink } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { dateFormat, getRequestLoggedIn } from "../functions/apiClient";
// import { ApplicationContext } from "../Context/ApplicationContext";
import ThemeProvider from "../Theme/index.js";
import { dashboardRecords, productList } from "../endpoints";
import { profileState } from "../store";
import { useAtom } from "jotai";

function Dashboard() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [dashboardTileData, setDashboardTileData] = useState({});
  const [rows, setDashboardTableData] = useState([]);
  const [profile] = useAtom(profileState);

  useEffect(() => {
    const getDashboardTileData = async () => {
      const res = await getRequestLoggedIn(dashboardRecords);
      if (res?.status_code === "200") {
        setDashboardTileData(res);
      } else {
        setDashboardTileData({});
      }
    };
    const getDashboardTableData = async () => {
      const res = await getRequestLoggedIn(productList);
      if (res?.statusCode === "200") {
        let data = res.productList;

        setDashboardTableData(data);
      } else {
        setDashboardTableData([]);
      }
    };

    getDashboardTileData();
    getDashboardTableData();
  }, []);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "tokenId",
      numeric: false,
      disablePadding: false,
      label: "Token ID",
    },
    {
      id: "productId",
      numeric: true,
      disablePadding: false,
      label: "Product Serial No",
    },
    {
      id: "purchaseDate",
      numeric: true,
      disablePadding: false,
      label: "Purchase Date",
    },
    {
      id: "warrantyDate",
      numeric: true,
      disablePadding: false,
      label: "Warranty Expiration",
    },
    {
      id: "customerEmailId",
      numeric: true,
      disablePadding: false,
      label: "Customer Email Id",
    },
  ];
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={"normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                backgroundColor: "#ccc",
                fontWeight: "800",
                fontSize: "0.8rem !important",
                padding: "8px 0px 8px 8px !important",
                lineHeight: "0.9rem !important",
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <ThemeProvider>
      <div className="dashboardContainer">
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "10px 5px 20px",
          }}
        >
          <Grid item sx={{ paddingRight: "10px" }}>
            <CardMedia
              sx={{ height: "50px" }}
              component="img"
              image={DashAvatarIcon}
            />
          </Grid>
          <Grid
            item
            sx={{ marginTop: "5px !important", paddingLeft: "0px !important" }}
            sm={11.3}
          >
            <Grid container display="flex" flexDirection="column" spacing={1}>
              <Grid item sx={{ paddingLeft: "5px", fontSize: "18px" }} sm={12}>
                Welcome Back, <strong>{" Ritesh Kumar"}</strong>
              </Grid>
              <Grid item sx={{ paddingLeft: "5px", fontSize: "18px" }} sm={12}>
                {profile?.roleType}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <Box width="160px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#C52A1A",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ width: "100%" }}>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid item sx={{ color: "white", fontSize: "11px" }}>
                      Token Count
                    </Grid>
                    {/* <Grid>
                      <NavLink to="/tokens">
                        <ArrowForwardIosRoundedIcon
                          sx={{
                            color: "white",
                            float: "right",
                          }}
                        />
                      </NavLink>
                    </Grid> */}
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "flex-start",
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: "2px",
                        }}
                      >
                        {dashboardTileData.totalTokens || 0}
                      </div>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "70px" }}>
                  <CardMedia
                    sx={{
                      height: "90px",
                      marginLeft: "50px",
                      marginTop: "12px",
                    }}
                    component="img"
                    image={T1}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item>
            <Box width="160px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#FFBF1F",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ width: "100%" }}>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid item sx={{ color: "white", fontSize: "11px" }}>
                      Product Count
                    </Grid>
                  </Grid>
                  {/* <Grid
                    style={{
                      justifyContent: "flex-end",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "white",
                      textTransform: "none",
                      paddingLeft: "8px",
                    }}
                  >
                    <NavLink to="/tokens">
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          color: "white",
                          float: "right",
                        }}
                      />
                    </NavLink>
                  </Grid> */}
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{
                          justifyContent: "flex-start",
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: "2px",
                        }}
                      >
                        {dashboardTileData.totalProducts || 0}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "70px" }}>
                  <CardMedia
                    sx={{
                      height: "80px",
                      marginLeft: "50px",
                      marginBottom: "12px",
                    }}
                    component="img"
                    image={T2}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item>
            <Box width="160px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#415385",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ width: "100%" }}>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid item sx={{ color: "white", fontSize: "11px" }}>
                      Blank Token Count
                    </Grid>
                  </Grid>
                  {/* <Grid
                    style={{
                      justifyContent: "flex-end",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "white",
                      textTransform: "none",
                      paddingLeft: "8px",
                    }}
                  >
                    <NavLink to="/tokens">
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          color: "white",
                          float: "right",
                        }}
                      />
                    </NavLink>
                  </Grid> */}
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{
                          justifyContent: "flex-start",
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: "2px",
                        }}
                      >
                        {dashboardTileData.blankTokens || 0}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "70px" }}>
                  <CardMedia
                    sx={{
                      height: "85px",
                      marginLeft: "61px",
                      marginBottom: "17px",
                    }}
                    component="img"
                    image={T3}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item>
            <Box width="160px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#D04A02",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ width: "100%" }}>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid item sx={{ color: "white", fontSize: "11px" }}>
                      Customer Count
                    </Grid>
                  </Grid>
                  {/* <Grid
                    style={{
                      justifyContent: "flex-end",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "white",
                      textTransform: "none",
                      paddingLeft: "8px",
                    }}
                  >
                    <NavLink to="/tokens">
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          color: "white",
                          float: "right",
                        }}
                      />
                    </NavLink>
                  </Grid> */}
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{
                          justifyContent: "flex-start",
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: "2px",
                        }}
                      >
                        {dashboardTileData.totalUsers || 0}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "70px" }}>
                  <CardMedia
                    sx={{
                      height: "85px",
                      marginLeft: "64px",
                      marginBottom: "20px",
                    }}
                    component="img"
                    image={T4}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          {/* <Grid item>
            <Box width="160px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#22992E",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Grid item sx={{ color: "white", fontSize: "11px" }}>
                      Token Count
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      justifyContent: "flex-end",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "white",
                      textTransform: "none",
                      paddingLeft: "8px",
                    }}
                  >
                    <NavLink to="/tokens">
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          color: "white",
                          float: "right",
                        }}
                      />
                    </NavLink>
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{
                          justifyContent: "flex-start",
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: "2px",
                        }}
                      >
                        {dashboardTileData.totalRetailers || 0}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "70px" }}>
                  <CardMedia
                    sx={{
                      height: "82px",
                      marginLeft: "41px",
                      marginBottom: "14px",
                    }}
                    component="img"
                    image={T5}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid> */}
        </Grid>
        <Grid item sx={{ paddingTop: "0px" }} sm={12}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "15px",
            }}
          >
            <Grid
              item
              sx={{
                paddingLeft: "2px",
                paddingTop: "20px",
                fontWeight: "800",
                fontSize: "18px",
              }}
              sm={12}
            >
              My Bookmarks
            </Grid>
            <Grid
              item
              sx={{
                paddingRight: "2px",
                paddingTop: "2px",
                paddingLeft: "0px",
                paddingBottom: "2px",
              }}
              sm={12}
            >
              <Box
                width="90vw"
                sx={{
                  background: "#FFFFFF",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  width: "100%",
                }}
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  <Grid item width={"100%"}>
                    <Grid
                      container
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                      }}
                    >
                      <Grid item>
                        <NavLink
                          to="/Profile"
                          style={{
                            marginLeft: "3vw",
                            marginRight: "3vw",
                            fontWeight: 400,
                            justifyContent: "flex-start",
                            fontSize: "15px",
                            color: "#0063F9",
                            textDecoration: "underline",
                            textTransform: "none",
                          }}
                        >
                          My Profile
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to="/ProductList"
                          style={{
                            marginLeft: "3vw",
                            marginRight: "3vw",
                            fontWeight: 400,
                            justifyContent: "flex-start",
                            fontSize: "15px",
                            color: "#0063F9",
                            textDecoration: "underline",
                            textTransform: "none",
                          }}
                        >
                          Product List
                        </NavLink>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item width={"100%"}>
                    <Grid
                      container
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                      }}
                    >
                      <Grid item>
                        <NavLink
                          to="/CreateTokens"
                          style={{
                            marginLeft: "3vw",
                            marginRight: "3vw",
                            fontWeight: 400,
                            justifyContent: "flex-start",
                            fontSize: "15px",
                            color: "#0063F9",
                            textDecoration: "underline",
                            textTransform: "none",
                          }}
                        >
                          Create Bulk Tokens
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to="/AddProduct"
                          style={{
                            marginLeft: "3vw",
                            marginRight: "3vw",
                            fontWeight: 400,
                            justifyContent: "flex-start",
                            fontSize: "15px",
                            color: "#0063F9",
                            textDecoration: "underline",
                            textTransform: "none",
                          }}
                        >
                          Add Product
                        </NavLink>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ padding: "10px" }} sm={12}>
          <Grid
            item
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              background: "#FFFFFF",
              border: "1px solid #b9b9b9",
              borderRadius: "10px",
            }}
            sm={12}
          >
            <Box width="90vw" sx={{ maxHeight: "180px" }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={"small"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  {rows && rows.length > 0 && (
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const expDateRaw = row?.warrantyPeriod;
                          const expDate = dateFormat(expDateRaw);

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: "0.8rem !important",
                                  padding: "8px 0px 8px 8px !important",
                                  lineHeight: "0.9rem !important",
                                }}
                              >
                                {row.tokenId}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "0.8rem !important",
                                  padding: "8px 0px 8px 8px !important",
                                  lineHeight: "0.9rem !important",
                                }}
                                align="left"
                              >
                                {row.productSerialNumber}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "0.8rem !important",
                                  padding: "8px 0px 8px 8px !important",
                                  lineHeight: "0.9rem !important",
                                }}
                                align="left"
                              >
                                {row.dateOfPurchase}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "0.8rem !important",
                                  padding: "8px 0px 8px 8px !important",
                                  lineHeight: "0.9rem !important",
                                }}
                                align="left"
                              >
                                {expDate}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "0.8rem !important",
                                  padding: "8px 0px 8px 8px !important",
                                  lineHeight: "0.9rem !important",
                                }}
                                align="left"
                              >
                                {row.userEmail}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 22 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={8} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                  {rows.length === 0 && (
                    <TableBody>
                      {
                        <TableRow style={{ height: 22 }}>
                          <TableCell colSpan={8}>
                            No records available to display.
                          </TableCell>
                        </TableRow>
                      }
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                  height: "25px",
                  overflow: "hidden",
                  ".MuiTablePagination-toolbar": {
                    flexDirection: "row !important",
                    display: "flex !important",
                    alignItems: "baseline !important",
                  },
                  ".css-hrm44d-MuiButtonBase-root-MuiIconButton-root": {
                    paddingRight: "5px !important",
                    paddingTop: "5px !important",
                    paddingBottom: "0px !important",
                  },
                }}
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
