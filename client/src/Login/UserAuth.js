import React, { useState } from "react";
import { mslContext } from "../App.js";
import { Link, useNavigate } from "react-router-dom";

const UserAuth = () => {
  const navigate = useNavigate();
  const { srvPort, user, setUser } = React.useContext(mslContext);

  // onSubmit handler for logging in a user
  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formJSON),
    };
    fetch(`http://localhost:${srvPort}/login`, requestOptions)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        navigate("/Home");
      });
  };

  // onClick handler for logging out a user
  const handleLogout = () => {
    fetch(`http://localhost:${srvPort}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
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
  // const handleFetchUser = () => {
  //   fetch(`http://localhost:${srvPort}/fetch-user`, {
  //     method: "POST",
  //     "Access-Control-Allow-Origin": "*",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((userData) => {
  //       console.log("user data:", userData);
  //       setUser(userData);
  //     });
  // };

  return (
    <div className="p-8 col-span-2 place-items-center h-screen w-full">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="mb-10">
            <div className="flex justify-center">
              <i className="ss ss-ss3 text-4xl text-amber-600" />
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Log in into your account
            </h2>
            <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-200">
              Don't have an account yet?
              <Link
                to={"/SignUp"}
                className="font-medium text-amber-600 hover:text-amber-400 ml-2"
              >
                Signup
              </Link>
            </p>
            <form
              method="post"
              onSubmit={handleLogin}
              className="mt-8 space-y-6"
            >
              <div className="-space-y-px">
                <div className="my-5">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="rounded-md border-gray-300 dark:border-none w-full dark:text-slate-200 dark:bg-light-white"
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="rounded-md border-gray-300 w-full dark:border-none dark:text-slate-200 dark:bg-light-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-400 border-gray-300 rounded mt-3 "
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900 mt-3
                      dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm mt-3">
                    <Link
                      to={"/SignUp"}
                      className="font-medium text-amber-600 hover:text-amber-400 ml-2"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  {!user.username ? (
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 mt-5"
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 mt-5"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserAuth;
