import React from "react";

const AdminLogin = () => {
  return (
    <div className="container">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <form className="card-body">
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" required={true} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" required={true} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
