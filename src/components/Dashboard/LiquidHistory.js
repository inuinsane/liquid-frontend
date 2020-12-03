import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const LiquidHistory = () => {
  const [auth] = useContext(AuthContext);
  const [list, setList] = useState(null);

  useEffect(() => {
    if (!list) {
      Axios({
        url: auth.getHistoryUrl,
        method: "GET",
        headers: { Authorization: `Bearer ${auth.currentUser.token}` },
      })
        .then((res) => {
          setList(res.data);
        })
    }
  }, [auth, list]);

  const refreshPage = () => {
    Axios({
      url: auth.getHistoryUrl,
      method: "GET",
      headers: { Authorization: `Bearer ${auth.currentUser.token}` },
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        if (err) {
        }
      });
  };

  return (
    <>
      <CRow>
        <CCol className="mb-3">
          <CButton
            className="btn-pill btn-dark btn-sm float-right"
            onClick={refreshPage}
            style={{
              backgroundColor: "#0f4c75",
              border: "none",
              color: "#bbe1fa",
            }}
          >
            <i className="c-icon cil-sync mse-3" /> Refresh
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        {list !== null ? (
          list.map((item, idx) => {
            return (
              <CCol lg={4} key={idx}>
                <CCard
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#0f4c75",
                    border: "none",
                  }}
                >
                  <CCardHeader
                    className="text-white"
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      backgroundColor: "#3282b8",
                      border: "none",
                    }}
                  >
                    <strong>Tanggal: {item.tanggal || "11-11-20"}</strong>
                  </CCardHeader>
                  <CCardBody>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Kode: {item}</li>
                      <li className="list-group-item">Status:</li>
                      <li className="list-group-item">Total Penilai:</li>
                    </ul>
                  </CCardBody>
                  <CCardFooter
                    style={{
                      borderRadius: "0px 0px 15px 15px",
                      backgroundColor: "#3282b8",
                      border: "none",
                    }}
                  >
                    <CButton className="btn-block text-white">
                      <i className="cil-eye"></i>
                      <strong>Lihat</strong>
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            );
          })
        ) : (
            <CCol>
              <h5>Belum ada data...</h5>
            </CCol>
          )}
      </CRow>
    </>
  );
};

export default LiquidHistory;
