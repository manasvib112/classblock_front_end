import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Register(props) {
  const [fullName, setFullName] = useState("");
  const [enrolment, setEnrolment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleFullName = (event) => {
    const value = event.target.value;
    setFullName(value);
  };
  const handleEnrolment = (event) => {
    const value = event.target.value;
    setEnrolment(value);
  };
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };
  const handleRegistration = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      alert("Password does not match");
    } else {
      axios
        .post("http://localhost:5000/api/user/register", {
          name: fullName,
          password,
          uid: enrolment,
          email,
          role: "student",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="main-container">
      <div className="left-section">
        <div className="left-container">
          <h2>Register</h2>
          <div className="tab-row">
            <div className="tab active">Student</div>
            <div className="tab">Teacher</div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={handleFullName}
            ></input>
            <input
              type="text"
              placeholder="Enrolment"
              value={enrolment}
              onChange={handleEnrolment}
            ></input>
            <input
              type="Email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            ></input>
            <input
              type="Password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            ></input>
            <input
              type="Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            ></input>
            <button onClick={handleRegistration}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
