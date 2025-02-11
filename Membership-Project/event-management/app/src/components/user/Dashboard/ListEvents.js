import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const EventList = (props) => {
  const navigate = useNavigate();
  const [listOfEvents, setListOfEvents] = useState([]);
  const [userAuth, setUserAuth] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("eee")
    if (token !== null || undefined) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          nani_header_key: token,
        },
      };
      fetch("http://localhost:3095/user/auth/", options)
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) {
            setUserAuth(res.success);
          } else {
            // localStorage.removeItem("token");
            console.log("responseNotTrue");
            navigate("/login");
          }
        });
    } else {
      console.log("elseAlsoRunning");
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    console.log("eee")
    if (userAuth) {
      const options = {
        method: "GET",
      };
      fetch("http://localhost:3095/event/list/", options)
        .then((response) => response.json())
        .then((res) => setListOfEvents(res.results));
    }
  }, [userAuth]);

  const listview = listOfEvents.map((event, i) => {
    return (
      <div className="col-md-12 p-2 mb-2" key={i}>
        <div className="border border-primary rounded p-3 shadow-sm">
          <h3>{event.event_name}</h3>
          <p>{event.event_description}</p>
          <hr />
          <div className="row">
            <div className="col text-left">
              <b>
                {event.event_date} | {event.event_amount}
              </b>
            </div>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/user/event/${event.event_id}`);
                }}
              >
                Book Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">{listview}</div>
      </div>
    </>
  );
};

export default EventList;
