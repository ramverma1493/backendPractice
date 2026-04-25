import React from "react";
import style from "./Login.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let payload = { email, password };

    try {
      let response = await axios.post("http://localhost:8080/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        setMsg(response.data.message);
        navigate("/", { state: { response: response.data } });
      } else {
        setMsg("Login failed");
      }

      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        setMsg(error.response.data.error);
        console.error("Backend message:", error.response.data);
        console.error(
          "Actual error:",
          error.response.data.error || error.response.data.msg,
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        {msg && <p>{msg}</p>}
        <h1>Login</h1>
        {/* Login form content */}
        <form className={style.form} onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
