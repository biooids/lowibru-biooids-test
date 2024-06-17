import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/theme/themeSlice.js";

function Header() {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="sm:text-xl text-sm self-center whitespace-nowrap font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-purple-800 via-slate-700 to-cyan-700 text-white rounded-md">
          gna-biooid
        </span>
        blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex  gap-2 md:order-2">
        <Button
          className="w-12 h-10  sm:inline"
          color="gray"
          pill
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user avatar" img={currentUser.profilePicture} />
            }
          >
            <Dropdown.Header>
              <div className="block text-sm">@{currentUser.username}</div>
              <div className="block text-sm font-medium truncate">
                {currentUser.email}
              </div>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
            <DropdownDivider />
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In{" "}
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="flex justify-center">
            Home
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/lectures"} as={"div"}>
          <Link to="/lectures" className="flex justify-center">
            Lectures
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/events"} as={"div"}>
          <Link to="/events" className="flex justify-center">
            events
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
