import React from "react";
import "./style.css";
import image from "../../../src/asset/images/images.png";
import profile from "../../../src/asset/images/profile.jpeg";
import {
  Notifications,
  HomeRounded,
  PeopleAltRounded,
  PersonRounded,
} from "@material-ui/icons";

export default function Header(prope) {
  return (
    <div className="header">
      <div className="left-section">
        <img src={image} alt="classblock-logo" />
        <input type="text" placeholder="Search"></input>
      </div>
      <div className="middle-section">
        <Notifications fontSize="large" />
        <HomeRounded fontSize="large" />
        <PeopleAltRounded fontSize="large" />
        <PersonRounded fontSize="large" />
      </div>
      <div className="right-section">
        <div className="text-section">
          <span>Hi</span>
          <br />
          Aditya
        </div>
        <div className="img-section">
          <img src={profile} alt="profile" />{" "}
        </div>
      </div>
    </div>
  );
}
