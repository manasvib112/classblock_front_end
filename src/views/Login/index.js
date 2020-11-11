import React from "react";
import "./style.css";

function Login(props) {
  return (
    <div className="main-container">
      <div className="left-section">
        <div className="left-container">
          <span>Welcome to</span>
          <h1>Classblock</h1>
          <h2>Login</h2>
          <div className="tab-row">
            <div className="tab active">Student</div>
            <div className="tab">Teacher</div>
          </div>
          <form>
            <input type="text" placeholder="Enrollment"></input>
            <input type="password" placeholder="Password"></input>
            <button type="submit">Sign In</button>
          </form>
          Don’t have an account?
          <a href="/">Sign up!</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
