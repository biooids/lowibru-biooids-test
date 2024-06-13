import React from "react";
import "../../css/lectures.css";
import DiscoverCard from "./DiscoverCard";
import { Link } from "react-router-dom";

function MyLectures() {
  return (
    <div className="lectures-card-containers ">
      <Link to="1">
        <DiscoverCard />
      </Link>
    </div>
  );
}

export default MyLectures;
