import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import Header from './Header';

const RegisterForm = () => {
    const [isGuest, setisGuest] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [userFailed, setUserFailed] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [prefix, setPrefix] = useState("Mr.");
    const [state, setState] = useState({
        createdData: new Date(),
        userName:"",
        userEmail:"",
        userMobile:"",
        memberType:0,
        membershipNumber:'',
        haveGuest:0,
        userRole:"user",
        payment:0,
        userPassword:"123456",
    });
  return (
    <>
    <Header />
    <div className='container'>
      
    </div>
    </>
  )
}

export default RegisterForm
