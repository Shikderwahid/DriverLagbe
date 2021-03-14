import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { storage, db } from "../service/firebase";
export default function Verify() {
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const getUserData = useCallback(async () => {
    const usr = db.collection("users").doc(currentUser?.uid);
    usr.get().then((doc) => {
      setUser(doc.data());
    });
  }, [currentUser?.uid]);
  useEffect(() => {
    getUserData();
    console.log(currentUser);
  }, [currentUser, getUserData]);
  const upload = (file) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref(`verifidocs/${file[0].name}`).put(file[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("verifidocs")
            .child(file[0].name)
            .getDownloadURL()
            .then((url) => {
              resolve({ name: file[0].name, url });
            });
        }
      );
    });
  };
  const verifyUser = async ({ nidno, nidfront, nidback, dlfront, dlback }) => {
    let docs = {
      nidno,
      nidfront: await upload(nidfront),
      nidback: await upload(nidback),
      dlfront: await upload(dlfront),
    };
    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        docs,
      })
      .then(() => {
        history.push("/profile");
      });
  };
  return (
    <div className="container">
      {user?.docs ? (
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-header">
            <h3>Submitted documents</h3>
          </div>
          <div className="card-body d-flex flex-column">
            <p>NID no: {user?.docs?.nidno}</p>
            <p>NID front: </p>
            <img
              style={{ maxWidth: "100%" }}
              src={user?.docs?.nidfront?.url}
              alt={user?.docs?.nidfront?.name}
            />
            <p>NID back: </p>
            <img
              style={{ maxWidth: "100%" }}
              src={user?.docs?.nidback?.url}
              alt={user?.docs?.nidback?.name}
            />
            <p>Driving Liscence : </p>
            <img
              style={{ maxWidth: "100%" }}
              src={user?.docs?.dlfront?.url}
              alt={user?.docs?.nidfrot?.name}
            />

          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(verifyUser)}
          className="card mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <div className="card-header">
            <h3>Driver verification</h3>
            <p>You must submit the following documents to start posting jobs</p>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>National ID no.</label>
              <input
                className="form-control"
                name="nidno"
                ref={register({ required: "Your nid no. is required" })}
                type="number"
              ></input>
            </div>
            <div className="form-group">
              <label>National ID (front)</label>
              <input
                className="form-control"
                name="nidfront"
                ref={register({
                  required: "Your nid front side picture is required",
                })}
                type="file"
              ></input>
            </div>
            <div className="form-group">
              <label>National ID (back)</label>
              <input
                className="form-control"
                name="nidback"
                ref={register({
                  required: "Your nid back side pirture is required",
                })}
                type="file"
              ></input>
            </div>
            <div className="form-group">
              <label>Driving Liscence </label>
              <input
                className="form-control"
                name="dlfront"
                ref={register({
                  required:
                    "Your driving liscence front side pirture is required",
                })}
                type="file"
              ></input>
            </div>

            <div className="form-group">
              <button className="btn btn-danger" type="submit">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
          {(errors?.nidno ||
            errors?.nidfront ||
            errors?.nidback ||
            errors?.dlfront) && (
              <Alert className="card-footer" variant="danger">
                <p>{errors?.nidno?.message}</p>
                <p>{errors?.nidfront?.message}</p>
                <p>{errors?.nidback?.message}</p>
                <p>{errors?.dlfront?.message}</p>

              </Alert>
            )}
        </form>
      )}
    </div>
  );
}
