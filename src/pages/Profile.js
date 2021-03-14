import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../service/firebase";
const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  // const [posts, setPosts] = useState([]);
  const getUserData = useCallback(async () => {
    const usr = db.collection("users").doc(currentUser?.uid);
    await usr.get().then((doc) => {
      setUser(doc.data());
    });
  }, [currentUser?.uid]);
  // const getPosts = useCallback(async () => {
  //   const postquery = db
  //     .collection("posts")
  //     .where("driverid", "==", currentUser?.uid);
  //   postquery.get().then((doc) => {
  //     console.log(doc);
  //   });
  //   // await psts.get().then((doc) => {
  //   //   setPosts(doc.data());
  //   // });
  // }, [currentUser?.uid]);
  useEffect(() => {
    getUserData();
    console.log(currentUser);
  }, [currentUser, getUserData]);

  // useEffect(() => {
  //   getPosts();
  // }, [getPosts]);

  return (
    <div className=" container m-5 mx-auto d-flex flex-column justify-content-center">
      <div className="container m-5 mx-auto d-flex flex-column justify-content-center">
        <div className="mx-auto d-flex flex-column justify-content-center align-items-center">
          <img
            src={currentUser?.photoURL}
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="WS"
          />
          <h1>{currentUser?.displayName}</h1>
        </div>
      </div>

      <div className="d-flex flex-column pt-4 pl-3">
        <p>Loction: {user?.location}</p>
        <p>Phone : {user?.phone}</p>
        <p>Email : {currentUser?.email} </p>
      </div>
      {user?.docs ? (
        <Link as={Link} to="/jobpost" className="mt-5 mb-5 mx-auto">
          <b> Post a Job</b>
        </Link>
      ) : (
        <Link as={Link} to="/verify" className="mt-5 mb-5 mx-auto">
          <b>Verify your account to post a job</b>
        </Link>
      )}
      {/* <Link as={Link} to="/jobpost" className="mt-5 mb-5 mx-auto">
        <b> Post a Job</b>
      </Link> */}

      {/* <button
        type="button"
        disabled={!currentUser?.emailVerified}
        onClick={() => {
          // history.push("/profile/editprofile");
        }}
        className="btn btn-primary w-100"
        style={{ marginBottom: "10px" }}
      >
        Edit Profile
      </button> */}
      {/* <div className="container">
        {user?.posts?.map((post, id) => (
          <div key={id} className="card"></div>
        ))}
      </div> */}
    </div>
  );
};

export default Profile;
