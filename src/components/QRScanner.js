import { Grid } from "@mui/material";
import React from "react";
import QrReader from "react-qr-scanner";
import { useAtom } from "jotai";
import { qrUrl } from "../store";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [qRUrl, setQRUrl] = useAtom(qrUrl);
  const delay = 300;
  const Navigate = useNavigate();

  const handleScan = (data) => {
    if (!qRUrl) {
      setQRUrl(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <div>
      {!qRUrl?.text && (
        <QrReader
          constraints={{ video: { facingMode: "environment" } }}
          Media
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      {qRUrl?.text && (window.location.href = qRUrl?.text)}
    </div>
  );
};

export default QRScanner;
