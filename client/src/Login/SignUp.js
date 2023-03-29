import React, { useState } from "react";
import { mslContext } from "../App.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { srvPort, user, setUser } = React.useContext(mslContext);
  const [message, setMessage] = useState("");
  //onSubmit handler for registering a new user
  const handleRegister = (e) => {
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
    fetch(`http://localhost:${srvPort}/register`, requestOptions)
      .then((response) => response.json())
      .then((userData) => {
        if ("error" in userData) {
          setMessage(userData.error);
          console.log("error", userData);
        } else {
          setMessage("Login Successful");
          setUser(userData);
          navigate("/Home");
        }
      })
      .catch((error) => {
        alert("Not a valid registration");
      });
  };

  return (
    <div className="p-8 col-span-2 place-items-center h-screen w-full">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="mb-10">
            <div className="flex justify-center">
              <i className="ss ss-ss3 text-4xl text-slate-600" />
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              User Registration
            </h2>
            <p className="mt-5 text-center text-sm text-red-600 dark:text-red-200">
              {message}
            </p>
            <form
              method="post"
              onSubmit={handleRegister}
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
                    className="rounded-md border-gray-300 w-full"
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
                    className="rounded-md border-gray-300 w-full"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="isAdmin"
                    name="isAdmin"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-400 border-gray-300 rounded mt-3"
                  />
                  <label
                    htmlFor="isAdmin"
                    className="ml-2 block text-sm text-gray-900 mt-3"
                  >
                    Register as an Administrator
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 mt-5"
                  >
                    Register
                    <Link to={"/userauth"}></Link>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
