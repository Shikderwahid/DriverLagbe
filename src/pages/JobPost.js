import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { db } from "../service/firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
const JobPost = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const postJob = async ({ phone, location, basis, salary }) => {
    setLoading(true);
    let post = {
      phone,
      location,
      basis,
      salary,
      driverid: currentUser.uid,
      status: true,
    };
    let doc = await db.collection("posts").add(post);

    await db
      .collection("users")
      .doc(currentUser.uid)
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(doc.id),
      })
      .then(() => {
        history.push("/");
      });
    setLoading(false);
  };
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(postJob)}
        className="card mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="card-header">
          <h1>Post for a Job</h1>
        </div>
        <div className="card-body">
          <label className="mx-auto">Basis</label>
          <Form.Control
            as="select"
            name="basis"
            ref={register({ required: "You must select a basis of work" })}
          >
            <option value="per hour">per hour</option>
            <option value="per day">per day</option>
            <option value="per month">per Week</option>
            <option value="per month">per month</option>
          </Form.Control>
          <div className="form-group">
            <label>Expected salary</label>
            <input
              type="text"
              name="salary"
              ref={register({
                required: "You must mention your expectet salary",
              })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone No</label>
            <input
              type="text"
              defaultValue=""
              name="phone"
              className="form-control"
              ref={register({ required: "You must type your contact no." })}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              type="text"
              ref={register({
                required: "You must specify your work locations",
              })}
              className="form-control"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Post
          </button>
        </div>
      </form>
      {(errors?.basis ||
        errors?.phone ||
        errors?.salary ||
        errors?.location) && (
          <Alert className="card-footer" variant="danger">
            <p>{errors?.basis?.message}</p>
            <p>{errors?.phone?.message}</p>
            <p>{errors?.salary?.message}</p>
            <p>{errors?.location?.message}</p>
          </Alert>
        )}
    </div>
  );
};
export default JobPost;
