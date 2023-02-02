// form
import "../App.css";
// @mui
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Menu from "../components/Menu";
// components
// ----------------------------------------------------------------------

const WarrantySolutions = (props) => {
  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: "100vw",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 0),
    height: "100vh",
  }));

  return (
    <ContentStyle>
      <Grid
        sx={{
          backgroundColor: "black",
          borderRadius: "0 0 0 40px",
        }}
      >
        <Menu />
      </Grid>
      {props.children}
    </ContentStyle>
  );
};
export default WarrantySolutions;
