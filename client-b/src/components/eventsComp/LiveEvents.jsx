import React from "react";
import LiveEventsCard from "./LiveEventsCard";

function LiveEvents() {
  return (
    <section className=" flex flex-col gap-6 w-[450px]  m-auto sm:w-[400px] lg:w-auto">
      <LiveEventsCard />
      <LiveEventsCard />
      <LiveEventsCard />
      <LiveEventsCard />
    </section>
  );
}

export default LiveEvents;
