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
import { AuthContext } from "./Context/AuthContext";

const LiquidHistory = () => {
  const [auth] = useContext(AuthContext);
  const [list, setList] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!list) {
      Axios({
        url: auth.getHistoryUrl,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {
          if (err) {
            alert("Tidak ada data");
            setList(["Tidak ada data"]);
            // console.log(err)
          } else {
          }
        });
    }
  });

  return (
    <>
      <h3>
        <strong>History</strong>
      </h3>
      <CRow>
        {list ? (
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
            <h3>Belum ada data</h3>
          </CCol>
        )}
      </CRow>
    </>
  );
};

export default LiquidHistory;
