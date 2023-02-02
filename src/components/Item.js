import { Button, Grid } from "@mui/material";

const Item = ({ file, deleteHandler, showDeleteButton }) => {
  return (
    <Grid
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid>
        <img src={file} alt="data" height="200px" width="200px" />
      </Grid>
      {showDeleteButton && (
        <Grid>
          <Button
            variant="contained"
            sx={{
              minWidth: "200px",
              borderRadius: 0,
              backgroundColor: "#800000 ! important",
              mt: "2px",
            }}
            onClick={() => {
              deleteHandler(file);
            }}
          >
            Delete
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
export default Item;
