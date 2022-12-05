import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { registerStaff } from "../features/staffSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    roles: "",
    password: "",
    terminal: "",
    company: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(user);
    // const res = await API.post("/staff/register", user);
    dispatch(registerStaff(user));

    setUser({
      ...user,
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      terminal: "",
      company: "",
    });
  };

  return (
    <div className=" flex flex-col  w-full rounded-xl justify-center items-center mb-20">
      <form
        onSubmit={registerUser}
        className="shadow-none md:shadow-xl my-10 rounded-sm flex flex-col items-center  py-2 px-20"
      >
        <h3 className="text-lg font-bold py-4"> Register User </h3>
        <div className="flex flex-col">
          <input
            className="border border-black focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.firstname}
            onChange={(e) => {
              setUser({ ...user, firstname: e.target.value });
            }}
            type="text"
            placeholder="Firstname"
            required
          />
          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.lastname}
            onChange={(e) => {
              setUser({ ...user, lastname: e.target.value });
            }}
            type="text"
            placeholder="Lastname"
            required
          />
          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            type="email"
            placeholder="Email"
            required
          />

          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.phoneNumber}
            onChange={(e) => {
              setUser({ ...user, phoneNumber: e.target.value });
            }}
            type="text"
            placeholder="Phone Number"
            required
          />
          <select
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            required
            onChange={(e) => {
              if (e.target.value === "admin") {
                setUser({
                  ...user,
                  roles: {
                    staff: process.env.REACT_APP_STAFFCODE,
                    admin: process.env.REACT_APP_ADMINCODE,
                  },
                });
              } else if (e.target.value === "staff") {
                setUser({
                  ...user,
                  roles: { staff: process.env.REACT_APP_STAFFCODE },
                });
              } else if (e.target.value === "superAdmin") {
                setUser({
                  ...user,
                  roles: {
                    staff: process.env.REACT_APP_STAFFCODE,
                    admin: process.env.REACT_APP_ADMINCODE,
                    superAdmin: process.env.REACT_APP_SUPERADMINCODE,
                  },
                });
              } else {
                setUser({ ...user, roles: "" });
              }
            }}
            name="roles"
            id="roles"
          >
            <option value="">Select Role</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.terminal}
            onChange={(e) => {
              setUser({ ...user, terminal: e.target.value });
            }}
            type="terminal"
            placeholder="Terminal"
          />
          <select
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={user.company}
            name="company"
            id="company"
            onChange={(e) => {
              setUser({ ...user, company: e.target.value });
            }}
          >
            <option value="">Select company</option>
            {company.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-sm mt-7 transition hover:scale-105 active:scale-90">
          REGISTER
        </button>
      </form>
      <span
        onClick={() => {
          navigate("/dashboard/admin");
        }}
        className="flex space-x-1 items-center border px-2 py-1 hover:scale-105 active:scale-90 transition"
      >
        <button>Back To Dashboard</button>
        <BsBoxArrowRight />
      </span>
    </div>
  );
};

export default Register;
