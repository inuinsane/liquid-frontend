import React, { useContext } from "react";
import {
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarText,
  CNavLink,
  CToggler,
} from "@coreui/react";
import { AuthContext } from "../Context/AuthContext";
import Axios from "axios";

const TopNav = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);

  // Get default avatar from ui-avatars
  const getDefaultAvatar = (name) => {
    let slugname = name.split(" ").join("+");
    if (!auth.currentUser.avatar) {
      return `https://ui-avatars.com/api/?name=${slugname}&background=0D8ABC&color=fff&format=svg`;
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    Axios({
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => console.log(res.data));
    setAuth({
      ...auth,
      isLoggedIn: false,
      hasAccount: true,
      currentUser: {
        ...auth.currentUser,
        id: null,
        name: null,
        username: null,
        token: null,
        email: null,
      },
    });
    localStorage.removeItem("token");
  };

  return (
    <CNavbar expandable="sm" style={{ backgroundColor: "#0f4c75" }}>
      <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
      <CNavbarBrand>
        <strong>Liquid Enjiniring</strong>
      </CNavbarBrand>
      <CCollapse show={isOpen} navbar>
        <CNavbarNav>
          <CNavLink to="/dashboard/details">
            <strong>
              <i className="cil-home" /> Home
            </strong>
          </CNavLink>
          <CNavLink to="/dashboard/liquid">
            <strong>
              <i className="cil-bolt" /> Liquid
            </strong>
          </CNavLink>
          <CNavLink to="/dashboard/create-room">
            <strong>
              <i className="cil-plus" /> Create Room
            </strong>
          </CNavLink>
          <CNavLink to="/profile">
            <strong>
              <i className="cil-user" /> My Profile
            </strong>
          </CNavLink>
        </CNavbarNav>
        <CNavbarNav className="ml-auto">
          <CNavbarText className="mt-2">
            <p className="text-white">Halo, {auth.currentUser.name} :)</p>
          </CNavbarText>
          <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
            style={{ border: "none" }}
          >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <div className="c-avatar">
                <CImg
                  src={getDefaultAvatar(auth.currentUser.name || "User Name")}
                  fluid
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0 text-center" placement="bottom-end">
              {/* Header */}
              <CDropdownItem
                header
                tag="div"
                className="text-center"
                style={{
                  backgroundColor: "#bbe1fa",
                  border: "none",
                  color: "#1b262c",
                }}
              >
                <strong>{auth.currentUser.username || "Username"}</strong>
              </CDropdownItem>
              {/* Profile */}
              {/*<CDropdownItem to="/profile">
                <i className="c-icon mfe-2 cil-user" /> Profile
              </CDropdownItem>*/}
              {/* Logout */}
              <CDropdownItem onClick={handleLogout}>
                <i className="c-icon mfe-2 cil-room" /> Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
      </CCollapse>
    </CNavbar>
  );
};
export default TopNav;
