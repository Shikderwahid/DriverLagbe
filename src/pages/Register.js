import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const SignupUser = async ({
    name,
    email,
    password,
    phone,
    location,
    propic,
  }) => {
    try {
      setLoading(true);
      await signup(name, email, password, phone, location, propic).then(() => {
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit(SignupUser)} className="card-body">
          <div className="mb-3">
            <label>Full name</label>
            <input
              className="form-control"
              name="name"
              ref={register({ required: "Your full name is required" })}
              type="text"
            />
            {errors?.name && <p>{errors?.name?.message}</p>}
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              ref={register({ required: "Your email is required" })}
              type="email"
            />
          </div>
          <div className="mb-3">
            <label>Phone no.</label>
            <input
              className="form-control"
              name="phone"
              ref={register({ required: "Your phone no. is required" })}
              type="tel"
            />
          </div>
          <div className="mb-3">
            <label>Location</label>
            <input
              className="form-control"
              name="location"
              ref={register({
                required: "You should input your location",
              })}
              type="text"
            />
          </div>
          <div className="mb-3">
            <label>Your Photo</label>
            <input
              className="form-control"
              name="propic"
              ref={register({ required: "Your photo is required" })}
              type="file"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              ref={register({ required: "Your password is required" })}
              type="password"
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              className="form-control"
              name="cpassword"
              ref={register({
                required: "You should input your password again to verify",
                validate: (value) =>
                  value === watch("password") || "Your password does not match",
              })}
              type="password"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
        {(errors?.name ||
          errors?.email ||
          errors?.phone ||
          errors?.propic ||
          errors?.location ||
          errors?.password ||
          errors?.cpassword) && (
          <Alert className="card-footer" variant="danger">
            <p>{errors?.name?.message}</p>
            <p>{errors?.phone?.message}</p>
            <p>{errors?.propic?.message}</p>
            <p>{errors?.email?.message}</p>
            <p>{errors?.location?.message}</p>
            <p>{errors?.password?.message}</p>
            <p>{errors?.cpassword?.message}</p>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Register;
