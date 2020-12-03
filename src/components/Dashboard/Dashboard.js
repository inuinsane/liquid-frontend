import React, { Suspense, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CContainer } from "@coreui/react";
import Details from "./Details";
import Liquid from "../Liquid/Liquid";
import Profile from "../User/Profile";
import Room from "../Room/Room";
import TopNav from "./TopNav";
import { AuthContext } from "../Context/AuthContext";
import BottomFooter from './BottomFooter';

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
                        <Route path="/dashboard/details" component={Details} />
                        <Route path="/dashboard/create-room" component={Room} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/dashboard/liquid" component={Liquid} />
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
