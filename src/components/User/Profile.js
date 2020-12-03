import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import AvatarCard from "../Dashboard/AvatarCard";

const Profile = () => {
  const [auth] = useContext(AuthContext);
  const [input, setInput] = useState({
    name: auth.currentUser.name,
    email: auth.currentUser.email,
    username: auth.currentUser.username,
    avatar: "",
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setInput({ ...input, name: e.target.value });
        break;
      case "username":
        setInput({ ...input, username: e.target.value });
        break;
      case "email":
        setInput({ ...input, email: e.target.value });
        break;
      case "avatar":
        setInput({ ...input, avatar: e.target.value });
        break;
      // case "password":
      //   setInput({ ...input, email: e.target.value });
      //   break;
      default:
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = input;
    console.log(data);
  };

  return (
    <>
      <CRow>
        <CCol md={4}>
          <AvatarCard />
        </CCol>
        <CCol>
          <h3>Edit Biodata</h3>
          <CCard
            className="p-3 text-white"
            style={{
              borderRadius: "15px",
              backgroundColor: "#0f4c75",
              border: "none",
              color: "#bbe1fa",
            }}
          >
            <CForm>
              <CFormGroup className="row" style={{ color: "#bbe1fa" }}>
                <CLabel className="col-sm-2 col-form-label">
                  <strong>Name</strong>
                </CLabel>
                <div className="col-sm-9">
                  <CInput
                    type="text"
                    name="name"
                    className="form-control"
                    style={{ backgroundColor: "transparent", color: "#bbe1fa" }}
                    placeholder="Tuliskan Nama Anda"
                    value={input.name}
                    onChange={handleChange}
                  />
                </div>
              </CFormGroup>
              <CFormGroup className="row" style={{ color: "#bbe1fa" }}>
                <CLabel className="col-sm-2 col-form-label">
                  <strong>Email</strong>
                </CLabel>
                <div className="col-sm-9">
                  <CInput
                    type="email"
                    name="email"
                    className="form-control"
                    style={{ backgroundColor: "transparent", color: "#bbe1fa" }}
                    placeholder="Tuliskan Email Anda"
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
              </CFormGroup>
              <CFormGroup className="row" style={{ color: "#bbe1fa" }}>
                <CLabel className="col-sm-2 col-form-label">
                  <strong>Username</strong>
                </CLabel>
                <div className="col-sm-9">
                  <CInput
                    type="text"
                    name="username"
                    className="form-control"
                    style={{ backgroundColor: "transparent", color: "#bbe1fa" }}
                    placeholder="Tuliskan Username Anda"
                    value={input.username}
                    onChange={handleChange}
                  />
                </div>
              </CFormGroup>
              <CFormGroup className="row" style={{ color: "#bbe1fa" }}>
                <CLabel className="col-sm-2 col-form-label">
                  <strong>Avatar</strong>
                </CLabel>
                <div className="col-sm-9">
                  <CInputFile
                    name="Avatar"
                    style={{ backgroundColor: "transparent", color: "#bbe1fa" }}
                    value={input.avatar}
                    onChange={handleChange}
                  />
                </div>
              </CFormGroup>
              <CButton
                className="text-white btn-lg btn-block"
                onClick={handleUpdate}
              >
                <i className="mse-2 c-icon cil-paper-plane" />
                Update
              </CButton>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
