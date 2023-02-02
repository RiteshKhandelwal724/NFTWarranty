import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect, useState } from "react";
import { myTransactions } from "../endpoints";
import { dateFormat, getRequestLoggedIn } from "../functions/apiClient";
import ExpandMore from "@mui/icons-material/ExpandMore";
const Transactions = () => {
  const [response, setResponse] = useState({});
  const myTransactionsFun = async () => {
    const res = await getRequestLoggedIn(myTransactions());
    if (res?.statusCode === "200") {
      setResponse(res?.transactions);
    }
  };
  const [expanded, setExpanded] = useState(false);
  const handleChange = (isExpanded, pane1) => {
    setExpanded(isExpanded ? pane1 : false);
  };
  useEffect(() => {
    myTransactionsFun();
  }, []);
  return (
    <Grid sx={{ padding: "10px" }}>
      <Typography sx={{ fontWeight: "bold" }}>My Transactions</Typography>
      {response.length > 0 &&
        response.map((transaction, index) => {
          return (
            <Accordion
              expanded={expanded === `panel-${index}`}
              onChange={(event, isExpanded) =>
                handleChange(isExpanded, `panel-${index}`)
              }
            >
              <AccordionSummary
                id={`panel-${index}-header`}
                aria-controls={`panel-${index}-content`}
                expandIcon={<ExpandMore />}
              >
                <Grid
                  container
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Grid
                      container
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {transaction?.productImages?.length > 0 ? (
                        <Grid item xs={3}>
                          <img
                            src={transaction?.productImages[0].productImage}
                            alt="imageName"
                            width="30px"
                            height="30px"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                      <Grid item xs={9}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Grid item>
                            {transaction?.productDetails?.productSerialNumber}
                          </Grid>
                          <Grid item>Warranty Extended</Grid>
                          <Grid
                            item
                            sx={{ color: "#00BFFF", fontWeight: "bold" }}
                          >
                            {transaction?.transactionDetails?.rzrpayPayId}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} sx={{ color: "green", fontWeight: "bold" }}>
                    <Grid sx={{ height: "24px" }}>
                      <RupeeIcon height="10px" />
                      {transaction?.transactionDetails?.amount}
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingLeft: "15%", textAlign: "left" }}>
                <Grid>
                  <strong>Warranty Coverage Type</strong>
                  {" : "} {transaction?.productDetails?.typeOfWarrantyCoverage}
                </Grid>
                <Grid>
                  <strong>Date Of Transaction</strong>
                  {" : "} {dateFormat(transaction?.transactionDetails?.created)}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Grid>
  );
};
export default Transactions;
