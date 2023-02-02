import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { addUserProduct } from "../endpoints";
import { postRequestLoggedIn } from "../functions/apiClient";
import { prodData, verifyWarrantyState } from "../store";
import ErrorModal from "./ErrorModal";
import ExtendedWarrantyBenefitsModal from "./ExtendedWarrantyBenefitsModal";
import SuccessModal from "./SuccessModal";
const RenderModal = ({ open, setOpen }) => {
  const [productData] = useAtom(prodData);
  const [verifyWarranty, setVerifyWarranty] = useAtom(verifyWarrantyState);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const onClickHandler2 = async () => {
    try {
      let res;
      res = await postRequestLoggedIn(addUserProduct, {
        productId: productData.productSerialNumber,
      });
      if (res?.status_code === "200") {
        setVerifyWarranty("1");
        setSuccessModal(true);
      } else setErrorModal(true);
    } catch (error) {
      setErrorModal(true);
    }
  };

  return (
    <Grid>
      <ErrorModal open={errorModal} setOpen={setErrorModal} />
      <SuccessModal
        open={successModal}
        handleClose={() => {
          setSuccessModal(false);
          setOpen(false);
        }}
        message="Warranty Activation is Successful"
        subMessage="Please reach out for any assistance"
        secondButtonText="Close"
      />
      <ExtendedWarrantyBenefitsModal
        open={open}
        setOpen={setOpen}
        onClickHandler={() => {
          onClickHandler2();
        }}
      />
    </Grid>
  );
};
export default RenderModal;
