import React from "react";
import "./style.css";
import profile from "../../../src/asset/images/profile.jpeg";

export default function Comment(props) {
  console.log(props);
  return (
    <div className="comment-container">
      <img src={props.profile} alt="profile"></img>
      <div className="comment-section">
        <span className="name">{props.name}</span>
        <span className="details">{props.details}</span>
        {props.body}
      </div>
    </div>
  );
}
