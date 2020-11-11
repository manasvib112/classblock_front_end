import React from "react";
import Author from "../../components/Author";
import Header from "../../components/Header";
import Post from "../../components/Post";
import "./style.css";

export default function homepage(props) {
  return (
    <div className="home-wrappper">
      <div className="home-container">
        <div className="home-main">
          <Header />
          <div className="body-section">
            <Author />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}
