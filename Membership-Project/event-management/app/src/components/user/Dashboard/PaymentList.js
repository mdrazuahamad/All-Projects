import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'

const PaymentList = () => {
    const navigate = useNavigate();
    const [userAuth, setUserAuth] = useState();
    const token = localStorage.getItem("token");
    const [isModalOpen, setModalOpen] = useState(false);

    const [userList, setuserList] = useState([]);
    const [guestsList, setGuestsList] = useState([]);

    const getuserList = () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                nani_header_key: token,
            },
        };
        fetch("http://localhost:3095/payment/paymentlist/", options)
            .then((response) => response.json())
            .then((res) => {
                if (res.success === true) {
                    setuserList(res.results);
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
                <h1>Transaction List</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Payment ID</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Reason</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.length > 0 &&
                            userList?.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{v?.user_id}</td>
                                        <td>{v?.payment_id}</td>
                                        <td>{v?.order_id}</td>
                                        <td>{v?.amount}</td>
                                        <td>{v?.pay_reason}</td>
                                        <td>{v?.payment_sign}</td>
                                        <td>{v?.pay_status === "1" ? <span className="text-success">Successful</span> : <span className="text-danger">Unsuccessful</span>}</td>
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

export default PaymentList;