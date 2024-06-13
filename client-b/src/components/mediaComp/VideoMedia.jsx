import React from "react";
import leaderPic from "../../assets/leader.jpg";
import AudioMediaCards from "./AudioMediaCards";
import VideoMediaCards from "./VideoMediaCards";

function VideoMedia() {
  return (
    <section className="media-card-container flex flex-col xl:flex-row gap-5 w-full ">
      <div className=" xl:w-[60%] rounded-md overflow-hidden  flex flex-col gap-5 sticky top-24 h-fit z-20">
        <div className="h-[300px]   ">
          <img
            src={leaderPic}
            alt="yes"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3 flex-col bg-slate-600 xl:bg-transparent p-3  ">
          <h3 className="text-2xl">Lorem ipsum dolor </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum at
            facilis consectetur ratione accusamus obcaecati voluptatem vitae
            reprehenderit animi? Maxime quasi iusto, explicabo esse ut ea sit
            praesentium itaque facere.
          </p>
        </div>
      </div>
      <div className="xl:w-[40%]   ">
        <h3 className="text-2xl font-bold">All Media</h3>
        <div className=" bg-black bg-opacity-20 rounded-md relative">
          <div className="w-[100px] h-[100px] bg-red-600 rounded-full absolute   filter blur-3xl  opacity-90"></div>
          <div className="w-[100px] right-0 bottom-40 h-[100px] bg-red-600 rounded-full absolute   filter blur-3xl  opacity-60"></div>
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
          <VideoMediaCards />
        </div>
      </div>
    </section>
  );
}

export default VideoMedia;
