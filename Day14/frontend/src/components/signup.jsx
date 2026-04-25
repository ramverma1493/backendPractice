import React, { useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function signup() {
    const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("");
  let [phone, setPhone] = useState("");
  let [msg, setMsg] = useState("");
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "username") setUsername(value);
    else if (name === "dob") setDob(value);
    else if (name === "gender") setGender(value);
    else if (name === "phone") setPhone(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let payload = { name, email, password, username, dob, gender, phone };

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setMsg(response.data.error);
      navigate("/login");
      console.log("Happned");
    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        setMsg(response.data.error);
        console.error("Backend message:", error.response.data);
        console.error(
          "Actual error:",
          error.response.data.error || error.response.data.msg,
        );
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
    //console.log(payload);
  };

  return (
    <div className={style.container}>
      {/* signup form */}
      <div className={style.signup}>
        {msg && <p className={style.msg}>{msg}</p>}
        <h1>Signup</h1>
        <form className={style.form} onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
          <select name="gender" value={gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
