import { Avatar, Navbar } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function PostEvents() {
  return (
    <section className="flex flex-col gap-3">
      <section className=" rounded-md ">
        <div className="flex flex-col gap-3  ">
          <div className="flex gap-3 ">
            <h3 className="text-xl border-l-4 pl-3 justify-center">
              Your detailes
            </h3>
            <span className=" text-sm flex justify-center items-center hover:underline cursor-pointer">
              Edit
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Avatar
              img="/images/people/profile-picture-5.jpg"
              rounded
              bordered
              size="lg"
            />
            <div className="flex flex-col w-full gap-3  ">
              <h4 className="text-2xl">Hwapyong Maniragaba</h4>
              <div className=" w-full justify-between gap-3 flex flex-col md:flex-row">
                <div className="flex flex-col">
                  <span>role</span>
                  <span>Leader</span>
                </div>
                <div className="flex flex-col">
                  <span>number</span>
                  <span>(+250) 790 931 024</span>
                </div>
                <div className="flex flex-col">
                  <span>Email Adress</span>
                  <span>ehwapyongm@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar className="mt-3 rounded-md ">
          <div className="flex gap-3">
            <Link
              to="."
              relative="path"
              className="bg-slate-700 p-5 rounded-md text-nowrap"
            >
              Create Post
            </Link>
            <Link
              to="mypost"
              className="bg-slate-700 p-5 rounded-md text-nowrap"
            >
              My Posts
            </Link>
            <Link
              to="golive"
              className="bg-slate-700 p-5 rounded-md text-nowrap"
            >
              Go live
            </Link>
            <Link
              to="permission"
              className="bg-slate-700 p-5 rounded-md text-nowrap"
            >
              Permissions
            </Link>
          </div>
        </Navbar>
      </section>
      <section className="bg-slate-700 rounded-md p-3 ">
        <Outlet />
      </section>
    </section>
  );
}

export default PostEvents;
