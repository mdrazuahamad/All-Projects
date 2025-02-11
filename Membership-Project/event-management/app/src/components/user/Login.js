import React, { useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [mypassword, setKalyan] = useState("");
  const [userLogin, setuserLogin] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const addUserName = (e) => {
    setInputEmail(e.target.value);
  };

  const addPassword = (e) => {
    setKalyan(e.target.value);
  };
  const Auth = (token) => {
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
        localStorage.setItem("userrole", res?.user[0]?.user_role)
        if (res?.user[0]?.user_role === "admin") {
          navigate("/user/user-list");
        } else {

          navigate("/user/profile");
        }
        // return res;
      });
  }
  const submitTheFrom = (e) => {
    e.preventDefault();

    let newLogin = {
      username: inputEmail,
      password: mypassword,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLogin),
    };
    fetch("http://localhost:3095/user/login/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          Auth(res.token)
          setuserLogin(res.success);
          setResponseMessage(res.message);
          localStorage.setItem("token", res.token)
          localStorage.setItem("isLogged", res.success);
        } else {
          toast.error(`${res.message}`);
          setuserLogin(res.success);
          setResponseMessage(res.message);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="container p-3 mt-3">
        <ToastContainer />
        <div className="row">
          <div className="col-md-6 mb-2">
            <img alt="Login" className="img-fluid" src="./img/login.png" />
          </div>
          <div className="col-md-6 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Login</b>
                </h5>
              </div>
              {userLogin === false ? responseMessage : ""}
              <hr />
              <form onSubmit={submitTheFrom}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username / Email"
                    onChange={addUserName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    onChange={addPassword}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Get Me In
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-6 text-left">
                  <small>
                    No Account? <Link to="/register">Register Now</Link>
                  </small>
                </div>
                <div className="col-6 text-right">
                  <small>
                    <Link to="#">Forgot Password?</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
