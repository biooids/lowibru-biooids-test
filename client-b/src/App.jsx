import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Activities from "./components/eventsComp/Activities";
import LiveEvents from "./components/eventsComp/LiveEvents";
import UpcommingEvents from "./components/eventsComp/UpcommingEvents";
import SavedEvents from "./components/eventsComp/SavedEvents";
import PostEvents from "./components/eventsComp/postevent/PostEvents";

import EventCreate from "./components/eventsComp/postevent/EventCreate";
import EventPermission from "./components/eventsComp/postevent/EventPermission";
import EventGolive from "./components/eventsComp/postevent/EventGolive";
import EventMyPost from "./components/eventsComp/postevent/EventMyPost";
import Lectures from "./pages/Lectures";
import Discover from "./components/lecturesComp.jsx/Discover";
import MyLectures from "./components/lecturesComp.jsx/MyLectures";
import Upload from "./components/lecturesComp.jsx/Upload";
import Lesson from "./components/lecturesComp.jsx/Lesson";
import Media from "./pages/Media";
import AllMedia from "./components/mediaComp/AllMedia";
import AudioMedia from "./components/mediaComp/AudioMedia";
import VideoMedia from "./components/mediaComp/VideoMedia";
import Market from "./pages/Market";
import AllItems from "./components/MarketComp/AllItems";
import UploadItems from "./components/MarketComp/UploadItems";
import MyCart from "./components/MarketComp/MyCart";
import Status from "./components/MarketComp/Status";
import Talent from "./components/talentComp/Talent";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="talents" element={<Talent />} />

          <Route path="market" element={<Market />}>
            <Route index element={<AllItems />} />
            <Route path="uploaditems" element={<UploadItems />} />
            <Route path="mycart" element={<MyCart />} />
            <Route path="status" element={<Status />} />
          </Route>

          <Route path="media" element={<Media />}>
            <Route index element={<AllMedia />} />
            <Route path="audiomedia" element={<AudioMedia />} />
            <Route path="videomedia" element={<VideoMedia />} />
          </Route>

          <Route path="lectures" element={<Lectures />}>
            <Route index element={<Discover />} />
            <Route path="mylectures" element={<MyLectures />} />
            <Route path="mylectures/:id" element={<Lesson />} />
            <Route path="upload" element={<Upload />} />
          </Route>

          <Route path="events" element={<Events />}>
            <Route index element={<Activities />} />
            <Route path="live" element={<LiveEvents />} />
            <Route path="upcomming" element={<UpcommingEvents />} />
            <Route path="saved" element={<SavedEvents />} />
            <Route path="post" element={<PostEvents />}>
              <Route index element={<EventCreate />} />
              <Route path="golive" element={<EventGolive />} />
              <Route path="permission" element={<EventPermission />} />
              <Route path="mypost" element={<EventMyPost />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
