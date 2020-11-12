import React from "react";
import Author from "../../components/Author";
import Header from "../../components/Header";
import Post from "../../components/Post";
import profile1 from "../../../src/asset/images/profile1.jpeg";
import profile2 from "../../../src/asset/images/profile2.jpeg";
import profile3 from "../../../src/asset/images/profile3.jpeg";

import "./style.css";

export default function homepage(props) {
  return (
    <div className="home-wrappper">
      <div className="home-container">
        <div className="home-main">
          <Header />
          <div className="body-section">
            <Author />
            <Post
              body={[
                {
                  name: "manasvi",
                  comment: "beautiful",
                  details: "3yr student cutest girl in nfl",
                  profile: profile1,
                },
                {
                  name: "Aditya",
                  comment: "lovely",
                  details: "Works in JIO",
                  profile: profile2,
                },
              ]}
            />
            <Post
              body={[
                {
                  name: "Princy",
                  comment: "beautiful pic",
                  details: "3yr student",
                  profile: profile3,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
