import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const LoginUser = async ({ email, password }) => {
    try {
      setLoading(true);
      await login(email, password);
      history.push("/");
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(LoginUser)} className="card-body">
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              ref={register({ required: "Your email is required" })}
              type="email"
              required={true}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              ref={register({ required: "Your password is required" })}
              type="password"
              required={true}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
        {(errors?.password || errors?.email) && (
          <Alert className="card-footer" variant="danger">
            <p>{errors?.email?.message}</p>
            <p>{errors?.password?.message}</p>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Login;
