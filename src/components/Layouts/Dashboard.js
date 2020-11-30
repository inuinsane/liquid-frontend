import React, { Suspense, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Room from "./Room";
import Profile from "./Profile";
import TopNav from "../TopNav";
import Liquid from "./Liquid";
import { CContainer } from "@coreui/react";
import BottomFooter from "../BottomFooter";
import Details from "../Details";

const Dashboard = () => {
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    document.title = "Liquid Enjiniring | Dashboard";
  });
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  if (auth.currentUser.id) {
    return (
      <div className="c-app c-default-layout c-dark-theme">
        <div className="c-wrapper">
          <Router>
            <TopNav />
            <div className="c-body mb-5">
              <main
                className="c-main"
                style={{ backgroundColor: "#1b262c", color: "#bbe1fa" }}
              >
                <CContainer fluid>
                  <Suspense fallback={loading}>
                    <CContainer>
                      <Switch>
                        <Route path="/dashboard" component={Details} />
                        <Route path="/create-room" component={Room} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/liquid" component={Liquid} />
                      </Switch>
                    </CContainer>
                  </Suspense>
                </CContainer>
              </main>
            </div>
            <BottomFooter />
          </Router>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Dashboard;
