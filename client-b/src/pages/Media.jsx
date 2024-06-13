import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
function Media() {
  return (
    <section className="">
      <div className="flex gap-3 mt-3 mb-3 flex-col p-3">
        <h2 className="text-3xl">Welcome to Media Section</h2>
        <p>
          Explore activities going on and discover both live and upcoming events
          and join us in fostering a community of learning and growth.
        </p>
      </div>
      <Navbar className="sticky top-0 z-50">
        <div className="flex ">
          <Link to="." relative="path" className=" ">
            <Button
              color="gray"
              className=" rounded-l  rounded-r-none focus:ring-0"
            >
              <HiUserCircle className="mr-3 h-4 w-4" />
              All
            </Button>
          </Link>

          <Link to="audiomedia">
            <Button color="gray" className=" rounded-none focus:ring-0">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Audio Music
            </Button>
          </Link>
          <Link to="videomedia">
            <Button color="gray" className=" rounded-none focus:ring-0">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Videos
            </Button>
          </Link>
        </div>
      </Navbar>

      <section className="p-10 bg-slate-900">
        <Outlet />
      </section>
    </section>
  );
}

export default Media;
