import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getuserSuccess } from "../features/userSlice";
import { logging } from "../hooks/logging";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const formSubmit = async (e) => {
    e.preventDefault();

    const result = await logging(user);
    dispatch(getuserSuccess(result));
    navigate("/dashboard/profile");
  };
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex shadow-xl rounded-sm flex-col items-center py-2 px-20">
        <h3 className="text-lg font-bold py-4"> SignIn</h3>

        <form onSubmit={formSubmit} className="flex flex-col">
          <input
            className="border-slate-700 shadow-lg rounded-sm focus:outline-none py-2 px-4 my-3"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            type="text"
            placeholder="email"
          />

          <input
            className="border-slate-700 shadow-lg rounded-sm focus:outline-none py-2 px-4 my-3"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            value={user.password}
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            className="shadow-md rounded-sm bg-black text-white px-4 py-2 transition hover:scale-105 mt-7 active:scale-90"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
