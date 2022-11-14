import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { registerCompany } from "../features/staffSlice";
import bankCodes from "../hooks/bankCodes.json";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyData({ ...companyData, logo: reader.result });
      };

      reader.readAsDataURL(image);
    } else {
      setCompanyData({ ...companyData, logo: "" });
    }
  }, [image]);

  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    logo: "",
    bank: "",
    accountNumber: "",
  });

  const register = (e) => {
    e.preventDefault();
    console.log(companyData);
    dispatch(registerCompany(companyData));
    setCompanyData({
      ...companyData,
      name: "",
      email: "",
      phoneNumber: "",
      bank: "",
      accountNumber: "",
    });
  };

  return (
    <div className=" flex flex-col  w-full rounded-xl justify-center items-center mb-20">
      <form
        onSubmit={register}
        className="shadow-none md:shadow-xl my-10 rounded-sm flex flex-col items-center  py-2 px-20"
      >
        <h3 className="text-lg font-bold py-4"> Register Company </h3>
        <div className="flex flex-col">
          <input
            className="border border-black focus:outline-none rounded-sm py-2 px-4 my-3"
            value={companyData.name}
            onChange={(e) => {
              setCompanyData({ ...companyData, name: e.target.value });
            }}
            type="text"
            placeholder="Name"
          />

          <input
            className="border border-black focus:outline-none rounded-sm py-2 px-4
          my-3"
            value={companyData.email}
            onChange={(e) => {
              setCompanyData({ ...companyData, email: e.target.value });
            }}
            type="email"
            placeholder="Email"
          />
          <input
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3"
            value={companyData.phoneNumber}
            onChange={(e) => {
              setCompanyData({ ...companyData, phoneNumber: e.target.value });
            }}
            type="text"
            placeholder="Phone Number"
          />
          <label htmlFor="logo" className="text-slate-400 mb-1 ">
            Logo
          </label>
          <input
            name="logo"
            id="logo"
            className="border border-black  focus:outline-none rounded-sm py-2 px-4"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
            type="file"
            accept="image/*"
            placeholder="Logo"
          />
          <input
            value={companyData.accountNumber}
            className="border border-black focus:outline-none rounded-sm py-2 px-4 my-3"
            onChange={(e) => {
              setCompanyData({ ...companyData, accountNumber: e.target.value });
            }}
            type="text"
            placeholder="Account Number"
          />
          <select
            value={companyData.bank}
            onChange={(e) => {
              setCompanyData({ ...companyData, bank: e.target.value });
            }}
            className="border border-black  focus:outline-none rounded-sm py-2 px-4 my-3 mt-4"
            name="bankCode"
            id="bankCode"
          >
            <option value="">Select Bank</option>
            {bankCodes.map((bank) => (
              <option key={bank.id} value={bank.code}>
                {bank.name}
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
