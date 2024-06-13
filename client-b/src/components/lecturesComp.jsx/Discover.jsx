import React from "react";
import "../../css/lectures.css";
import DiscoverCard from "./DiscoverCard";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <div className="lectures-card-containers ">
      <Link to="mylectures/1">
        <DiscoverCard />
      </Link>
      <DiscoverCard />
      <DiscoverCard />
      <DiscoverCard />
      <DiscoverCard />
      <DiscoverCard />
      <DiscoverCard />
    </div>
  );
}

export default Discover;
