import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useCallback, useEffect, useState } from "react";
import NavBar from "./components/layout/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import JobPost from "./pages/JobPost";
import Details from "./pages/driver/details";
import Verify from "./pages/Verify";
import { db } from "./service/firebase";
import AdminRoute from "./routes/AdminRoute";
function App() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const getUserData = useCallback(async () => {
    const usr = db.collection("users").doc(currentUser?.uid);
    await usr.get().then((doc) => {
      setUser(doc.data());
    });
  }, [currentUser?.uid]);
  useEffect(() => {
    getUserData();
    console.log(currentUser);
  }, [currentUser, getUserData]);

  return (
    <>
      <NavBar />
      <Route path="/" exact={true} component={Home} />
      <Route path="/details/:id" exact={true} component={Details} />
      {user && user?.type === "user" && (
        <>
          <PrivateRoute path="/profile" exact={true} component={Profile} />
          <PrivateRoute path="/jobpost" exact={true} component={JobPost} />
          <PrivateRoute path="/verify" exact={true} component={Verify} />
        </>
      )}
      {user && user?.type === "admin" && (
        <>
          <AdminRoute path="/dashboard" exact={true} component={Dashboard} />
        </>
      )}
      {!currentUser && (
        <>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" exact={true} component={Register} />
          <Route path="/admin/login" exact={true} component={AdminLogin} />
        </>
      )}
    </>
  );
}

export default App;
