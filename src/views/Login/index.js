import React, { useState } from "react";
import "./style.css";

function Login(props) {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleUid = (event) => {
    const value = event.target.value;
    setUid(value);
    console.log(uid);
  };
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    console.log(password);
  };

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
            <input
              type="text"
              placeholder="Enrollment"
              value={uid}
              onChange={handleUid}
            ></input>
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            ></input>
            <span
              className="show-password"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Show Password
            </span>
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
