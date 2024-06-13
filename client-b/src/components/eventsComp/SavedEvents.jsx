import React from "react";
import SavedEventsCard from "./SavedEventsCard";

function SavedEvents() {
  return (
    <section className=" flex flex-col gap-6 w-[450px]  m-auto sm:w-[400px] lg:w-auto">
      <SavedEventsCard />
      <SavedEventsCard />
      <SavedEventsCard />
    </section>
  );
}

export default SavedEvents;
