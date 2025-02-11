import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login.js";
import Register from "./components/user/Register.js";
import Home from "./components/user/Home.js";
import Events from "./components/user/Events.js";
import EventList from "./components/user/Dashboard/ListEvents.js";
import MyEvents from "./components/user/Dashboard/MyEvents.js";
import MyProfile from "./components/user/Dashboard/MyProfile.js";
import LogoutUser from "./components/user/Dashboard/Logout.js";
import EventDetails from "./components/user/EventDetails.js";
import DetailsOfEvent from "./components/user/Dashboard/DetailsOfEvent.js";
import UserList from "./components/user/Dashboard/UserList.js";
import GuestList from "./components/user/Dashboard/GuestList.js";
import PaymentList from "./components/user/Dashboard/PaymentList.js";
import Package from "./components/user/Dashboard/Package.js";
import PrivateRoute from "./PrivateRoute/index.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/user/events"
            element={<EventList />}
          />
          <Route path="/user/myevents" element={<MyEvents />} />
          <Route path="/user/user-list" element={<UserList />} />
          <Route path="/user/guest-list" element={<GuestList />} />
          <Route path="/user/package-list" element={<Package />} />
          <Route path="/payment/payment-list" element={<PaymentList />} />
          <Route path="/user/profile" element={<MyProfile />} />
          <Route path="/user/logout" element={<LogoutUser />} />
          <Route path="/user/event/:eid" element={<DetailsOfEvent />} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event/:eid" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
