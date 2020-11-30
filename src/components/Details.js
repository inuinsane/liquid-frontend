import React, { useContext } from "react";
import { CCard, CCardBody, CCardTitle, CCol, CImg, CRow } from "@coreui/react";
import { AuthContext } from "./Context/AuthContext";
import LiquidHistory from "./LiquidHistory";

const Details = () => {
  const getDefaultAvatar = (name) => {
    let slugname = name.split(" ").join("+");
    if (!auth.currentUser.avatar) {
      return `https://ui-avatars.com/api/?name=${slugname}&background=0D8ABC&color=fff&format=svg`;
    }
  };

  const [auth] = useContext(AuthContext);
  return (
    <CRow>
      <CCol lg={4}>
        <h3>
          <strong>Biodata</strong>
        </h3>
        <CCard
          className="p-3 text-white"
          style={{
            borderRadius: "15px",
            backgroundColor: "#0f4c75",
            border: "none",
            color: "#bbe1fa",
          }}
        >
          <CImg
            src={getDefaultAvatar(auth.currentUser.name || "User Name")}
            fluid
            className="rounded mx-auto w-50 h-auto"
            style={{ borderRadius: "15px" }}
          />
          <CCardTitle className="mt-3" style={{ color: "#bbe1fa" }}>
            <strong>{auth.currentUser.name || "User Name"}</strong>
          </CCardTitle>
          <CCardBody style={{ color: "#bbe1fa" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Username: {auth.currentUser.username || "User username"}
              </li>
              <li className="list-group-item">
                Email: {auth.currentUser.email || "User Email"}
              </li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={8}>
        <LiquidHistory />
      </CCol>
    </CRow>
  );
};

export default Details;
