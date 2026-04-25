import React from 'react'
import style from "./Dashboard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {

    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

      //console.log("Location state:", location.state);
      let response = location.state?.response || {};
      //console.log("Response data:", response);
      //console.log(response.headers.useLocation);
      let name = response?.data?.name || "User";
  return (
    <div>
      {`Hello, ${name}! Welcome to your dashboard.`}
    </div>
  )
}
