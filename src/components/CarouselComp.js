import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";

const CarouselComp = ({ imageFile, deleteHandler, showDeleteButton }) => {
  return (
    <Carousel
      sx={{
        position: "relative",
        overflow: "inherit ! important",
        padding: showDeleteButton ? "15px 0 5px" : "0 0 25px",
      }}
    >
      {imageFile.map((file) => (
        <Item
          file={showDeleteButton ? file : file?.productImage}
          deleteHandler={deleteHandler}
          showDeleteButton={showDeleteButton}
        />
      ))}
    </Carousel>
  );
};

export default CarouselComp;
