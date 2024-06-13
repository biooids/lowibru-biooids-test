import React from "react";
import UpcommingEventsCard from "./UpcommingEventsCard";

function UpcommingEvents() {
  return (
    <section className=" flex flex-col gap-6 w-[450px]  m-auto sm:w-[400px] lg:w-auto">
      <UpcommingEventsCard />
      <UpcommingEventsCard />
      <UpcommingEventsCard />
      <UpcommingEventsCard />
    </section>
  );
}

export default UpcommingEvents;
