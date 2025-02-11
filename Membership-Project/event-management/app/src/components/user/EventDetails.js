import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  let params = useParams();
  const navigate = useNavigate();
  const eventId = params.eid;
  const [eventDetails, setEventDetails] = useState("");
  const [eventDetailsShow, setEventDetailsShow] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(`http://localhost:3095/event/event/${eventId}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setEventDetails(res.results);
          setEventDetailsShow(res.success);
        } else {
          setEventDetailsShow(res.success);
        }
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {eventDetailsShow ? (
          <>
            <div className="row">
              <div className="col-md-12 p-2 mb-2">
                <div className="border border-primary rounded p-3 shadow-sm">
                  <h3>{eventDetails[0].event_name}</h3>
                  <p>{eventDetails[0].event_description}</p>
                  <hr />
                  <div className="row">
                    <div className="col text-left">
                      <b>
                        {eventDetails[0].event_date} |{" "}
                        {eventDetails[0].event_amount}
                      </b>
                    </div>
                    <div className="col text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Book Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Event id not found"
        )}
      </div>
    </>
  );
};

export default EventDetails;
