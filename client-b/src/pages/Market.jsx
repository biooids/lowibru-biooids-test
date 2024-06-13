import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
function Market() {
  return (
    <section className="">
      <div className="flex gap-3 mt-3 mb-3 flex-col p-3">
        <h2 className="text-3xl">Welcome to Lectures Section</h2>
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
              All Items
            </Button>
          </Link>

          <Link to="mycart">
            <Button color="gray" className=" rounded-none focus:ring-0">
              <HiAdjustments className="mr-3 h-4 w-4" />
              My Cart
            </Button>
          </Link>
          <Link to="uploaditems">
            <Button color="gray" className=" rounded-none focus:ring-0">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link to="status">
            <Button color="gray" className=" rounded-none focus:ring-0">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Status
            </Button>
          </Link>
        </div>
      </Navbar>
      <section className="p-10 bg-slate-900">
        <Outlet />
      </section>
      <div>
        <h4>Information About Buying and Selling</h4>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti,
            cupiditate iste ex possimus nesciunt, harum ipsa reiciendis culpa
            consectetur similique cumque, maxime natus cum veritatis molestias
            laudantium quibusdam maiores assumenda.
          </p>
          <div>
            <h5>Have a Question or probles</h5>
            <form action="">
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Market;
