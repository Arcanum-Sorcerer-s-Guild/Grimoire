import React, { useState } from "react";
import { mslContext } from "../App.js";

const UserAuth = () => {
  const { srvPort, user, setUser } = React.useContext(mslContext);

  // onSubmit handler for registering a new user
  const handleRegister = (e) => {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log("formJSON", formJSON);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formJSON),
    };
    fetch(`http://localhost:${srvPort}/register`, requestOptions)
      .then((response) => response.json())
      .then((userData) => {
        console.log("user data:", userData)
        setUser(userData);
      });
  };

  // onSubmit handler for logging in a user
  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log("formJSON", formJSON);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formJSON),
    };
    fetch(`http://localhost:${srvPort}/login`, requestOptions)
    .then((response) => response.json())
    .then((userData) => {
      console.log("user data:", userData)
      setUser(userData);
    });
  };

  // onClick handler for logging out a user
  const handleLogout = () => {
    fetch(`http://localhost:${srvPort}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUser({});
      });
  };

  // onClick handler for retrieving a user's data
  // response is:
  // {
  //   userId: 123,
  //   isAdmin: false,
  //   username: "testuser"
  // }
  const handleFetchUser = () => {
    fetch(`http://localhost:${srvPort}/fetch-user`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log("user data:", userData)
        setUser(userData);
      });
  };

  return (
    <>
  



      {/* Form for registering a user */}
      Register
      <form method="post" onSubmit={handleRegister}>
        <label for="username">Username</label>
        <input name="username" type="text" placeholder="username" />
        <br />
        <label for="password">Password</label>
        <input name="password" type="password" placeholder="Enter password" />
        <br />
        <label for="isAdmin">Admin?</label>
        <input name="isAdmin" type="checkbox" value="true" />
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      {/* Form for logging in a user */}
      Login
      <form method="post" onSubmit={handleLogin}>
        <label for="username">Username</label>
        <input name="username" type="text" placeholder="username" />
        <br />
        <label for="password">Password</label>
        <input name="password" type="password" placeholder="Enter password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      {/* Example button for logging out a user */}
      <button onClick={handleLogout}>Logout</button>
      <br />
      {/* Example button for retrieving a user's data */}
      <button onClick={handleFetchUser}>Retrieve User</button>
    </>
  );
};
export default UserAuth;
