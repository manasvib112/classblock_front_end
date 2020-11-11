import React from "react";
import "./style.css";

function Register(props) {
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
            <input type="text" placeholder="Full Name"></input>
            <input type="Enrolment" placeholder="Enrolment"></input>
            <input type="Email" placeholder="Email"></input>
            <input type="Password" placeholder="Password"></input>
            <input
              type="Confirm Password"
              placeholder="Confirm Password"
            ></input>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
