import React from "react";
import "./style.css";
import profile from "../../../src/asset/images/profile.jpeg";
import {
  InsertEmoticon,
  InsertCommentRounded,
  LaunchSharp,
  MoreHorizSharp,
} from "@material-ui/icons";

export default function Post(props) {
  return (
    <div className="post">
      <div className="post-top-section">
        <img src={profile} alt="profile" />
        <div className="details">
          <span>Aditya Priyam</span>
          <span className="date">20th January 4:00pm</span>
        </div>
        <MoreHorizSharp className="dots" />
      </div>
      <div className="post-middle-section">
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </span>
        <div className="media-container"></div>
        <div className="audience-interaction">
          <div className="like">
            <InsertEmoticon />
            <span>Like</span>
          </div>
          <div className="comment">
            <InsertCommentRounded />
            <span>Comment</span>
          </div>
          <div className="share">
            <LaunchSharp />
            <span>Share</span>
          </div>
        </div>
      </div>
      <div className="bottom-section"></div>
    </div>
  );
}
