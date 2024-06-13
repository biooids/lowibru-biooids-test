import React from "react";

import { Avatar } from "flowbite-react";

import leaderPic from "../../assets/leader.jpg";

import { CgSoftwareDownload } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

function VideoMediaCards() {
  return (
    <section className="mt-3 hover:bg-slate-600 hover:bg-opacity-55 cursor-pointer p-5 z-10 relative flex gap-2 rounded-md">
      <div className=" flex flex-col justify-start items-start gap-3">
        {" "}
        <Avatar img={leaderPic} bordered color="gray" size="lg" />
        <div className="flex justify-between w-full items-center">
          <CgSoftwareDownload className="text-2xl hover:text-amber-500" />
          <FaRegHeart className="text-xl  hover:text-amber-500" />
          <FaShareAlt className="text-xl  hover:text-amber-500" />
        </div>
      </div>
      <div className=" flex flex-col bg-black justify-start items-start ">
        <span>0{Math.round(Math.random() * 10)}</span>
        <h4>name</h4>
        <div>
          0{Math.round(Math.random() * 10)}:0{Math.round(Math.random() * 10)}
        </div>
      </div>
    </section>
  );
}

export default VideoMediaCards;
