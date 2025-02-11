import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    navigate("/");
  }, [navigate]);

  return (
    <>
      <h3>Logout</h3>
    </>
  );
};

export default LogoutUser;
