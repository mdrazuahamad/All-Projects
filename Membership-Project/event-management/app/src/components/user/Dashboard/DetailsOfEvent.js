import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";

const DetailsOfEvent = () => {
  let params = useParams();
  const navigate = useNavigate();
  const eventId = params.eid;
  const [userId, setUserId] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventDetailsShow, setEventDetailsShow] = useState(false);
  const [userAuth, setUserAuth] = useState();
  const [bookResponse, setBookResponse] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
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
            setUserId(res.user[0].user_id);
          } else {
            // localStorage.removeItem("token");
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, []);

  if (userAuth) {
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
  }

  function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }

  const bookEventNow = () => {
    const bookWithThisDetails = {
      event_id: eventId,
      user_id: userId,
      book_date: dateToYMD(new Date()),
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookWithThisDetails),
    };
    fetch("http://localhost:3095/booking/create/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setBookResponse(res.message);
        } else {
          setBookResponse(res.message);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        {bookResponse !== "" ? (
          <>
            <div className="mt-2 p-1">{bookResponse}</div>{" "}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                navigate("/user/myevents");
              }}
            >
              Check My Events
            </button>
          </>
        ) : (
          ""
        )}
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
                        onClick={bookEventNow}
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

export default DetailsOfEvent;
