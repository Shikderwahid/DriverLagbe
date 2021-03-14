import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { db } from "../../service/firebase";
import { useAuth } from "../../context/AuthContext";
// import firebase from "firebase/app";
import { Link } from "react-router-dom";

const Details = ({ match }) => {

  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const getUserData = useCallback(async () => {
    const usr = db.collection("users").doc(match?.params?.id);
    await usr.get().then((doc) => {
      setUser(doc.data());
    });
  }, [match?.params?.id]);
  console.log(user);

  //   const sendRequest = async () => {
  //     await db
  //       .collection("users")
  //       .doc(user.uid)
  //       .update({
  //         requests: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
  //       })
  //       .then(() => {
  //         history.push("/");
  //       });
  //   };

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <div className="container">
      {currentUser ? (
        <>
          <img
            src={user?.propic}
            className="mx-auto"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="WS"
          />
          <h1>{user?.name} </h1>

          <div className="d-flex flex-column pt-2 pl-2">
            <p>Loction: {user?.location} </p>
            <p>Phone : {user?.phone} </p>
            <p>Email : {user?.email}</p>
            <p>Driving Liscence : </p>
            <img
              style={{ maxWidth: "100%" }}
              src={user?.docs?.dlfront?.url}
              alt={user?.docs?.nidfrot?.name}
            />

          </div>

          <Button >Request Driver</Button>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <h4>
            You must <Link to="/login">login</Link> to view details
          </h4>
        </div>
      )}
    </div>
  );
};
export default Details;
