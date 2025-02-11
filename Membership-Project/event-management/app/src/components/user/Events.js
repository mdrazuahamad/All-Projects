import React, { useEffect, useState } from "react";
import Header from "./Header";
import EventsList from "./EventsList";

const Events = () => {
  const [listOfEvents, setListOfEvents] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch("http://localhost:3095/event/list/", options)
      .then((response) => response.json())
      .then((res) => setListOfEvents(res.results));
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <div className="row p-2">
          {listOfEvents !== undefined && listOfEvents?.length !== 0 ? (
            <EventsList eventsList={listOfEvents} />
          ) : (
            <>
              <p>Loading Events....</p>
            </>
          )}
        </div>
        <br />
        <hr />
        <br />
        <div className="text-center">
          <p>Copy @ ঢাকাস্থ চন্দনাইশবাসী - 2024</p>
        </div>
      </div>
    </>
  );
};

export default Events;
