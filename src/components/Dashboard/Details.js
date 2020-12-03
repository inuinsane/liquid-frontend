import React from "react";
import { CCol, CRow } from "@coreui/react";
import LiquidHistory from "./LiquidHistory";
import AvatarCard from "./AvatarCard";

const Details = () => {
  return (
    <CRow>
      <CCol lg={4}>
        <AvatarCard />
      </CCol>
      <CCol lg={8}>
        <LiquidHistory />
      </CCol>
    </CRow>
  );
};

export default Details;
