import { useState, useEffect, useCallback } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../service/firebase";
export default function PostCards({ post, match }) {
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
    <div className="card m-3">
      <div className="card-body">

        <h1>{user?.name}</h1>

        <h3>Expected Salary: Tk. {post?.salary}</h3>
        <p>Basis: {post?.basis}</p>
        <p>{post?.location}</p>
      </div>
      <div className="card-footer">
        <Link
          as={Link}
          to={`/details/${post?.driverid}`}
          className="btn btn-dark"
        >
          Details
        </Link>
        <button className="btn btn-primary">Request Driver</button>
      </div>
    </div>
  );
}
