import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'
const GuestList = () => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState();
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);

  const [userList, setuserList] = useState([]);
  const [guestsList, setGuestsList] = useState([]);
  const [totalList, setTotalList] = useState(0);

  const getuserList = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        nani_header_key: token,
      },
    };
    fetch("http://localhost:3095/user/guestlist/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setuserList(res.results);
          setTotalList(res?.total);
        } else {
          toast.error(`${res.message}`);
          // localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };
  const getGuestList = (guestid) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        nani_header_key: token,
      },
    };
    fetch(`http://localhost:3095/user/guests/${guestid}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setGuestsList(res.results);
        } else {
          toast.error(`${res.message}`);
        }
      });
  };
  const getPaymentList = (guestid) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        nani_header_key: token,
      },
    };
    fetch(`http://localhost:3095/user/payments/${guestid}`, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          // setGuestsList(res.results);
          console.log("payment", res)
        } else {
          toast.error(`${res.message}`);
        }
      });
  };
  useEffect(() => {
    if (token !== null || undefined) {
      getuserList();
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>Guest User List {`(${totalList})`}</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Relation</th>
              <th scope="col">Gender</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 &&
              userList?.map((v, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{v?.user_id}</td>
                    <td>{v?.guest_name}</td>
                    <td>{v?.relation}</td>
                    <td>{v?.gender}</td>
                    <td>{v?.age} years</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <h3>Guest List</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Relation</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {guestsList?.length > 0 &&
                  guestsList?.map((v, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v?.guest_name}</td>
                        <td>{v?.relation}</td>
                        <td>{v?.gender}</td>
                        <td>{v?.age} Years</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Modal>
        )}
      </div>
    </>
  );
};

export default GuestList;