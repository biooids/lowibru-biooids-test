import React from "react";

import { Avatar } from "flowbite-react";

import leaderPic from "../../assets/leader.jpg";

import { CgSoftwareDownload } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

function AudioMediaCards() {
  return (
    <section className="mt-3 hover:bg-slate-600 hover:bg-opacity-55 cursor-pointer items-center flex justify-between p-5 z-10 relative gap-2 rounded-md">
      <div className="flex gap-2 ">
        <span>0{Math.round(Math.random() * 10)}</span>
        <h4>name</h4>
      </div>
      <div className="gap-5 flex  justify-center items-center ">
        <Avatar img={leaderPic} rounded bordered color="gray" />
        <CgSoftwareDownload className="text-2xl hover:text-amber-500" />
        <FaRegHeart className="text-xl  hover:text-amber-500" />
        <FaShareAlt className="text-xl  hover:text-amber-500" />
      </div>
      <div className="w-16  text-end">
        0{Math.round(Math.random() * 10)}:0{Math.round(Math.random() * 10)}
      </div>
    </section>
  );
}

export default AudioMediaCards;
