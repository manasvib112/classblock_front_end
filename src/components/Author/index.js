import React from "react";
import "./style.css";
import image from "../../../src/asset/images/images.png";
import profile from "../../../src/asset/images/profile.jpeg";
import {
  PhotoLibrary,
  InsertEmoticon,
  AccountCircleRounded,
} from "@material-ui/icons";

export default function Author(props) {
  return (
    <div className="author">
      <div className="author-top">
        <img src={profile} alt="profile" />
        <form>
          <textarea type="text" placeholder="Whats on your mind?"></textarea>
        </form>
      </div>
      <div className="author-bottom">
        <div className="photo-option">
          <PhotoLibrary />
          <span>Photo/Video</span>
        </div>
        <div className="activity-option">
          <InsertEmoticon />
          <span>Feeling/Activity</span>
        </div>
      </div>
    </div>
  );
}
