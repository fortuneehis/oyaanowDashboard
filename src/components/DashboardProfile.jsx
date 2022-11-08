import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompany } from "../features/companySlice";

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  return (
    <div
      className=" flex flex-col mx-auto items-center rounded-sm h-full w-4/4 md:w-2/4   justify-center
      py-4 px-10 text-slate-100 bg-black "
    >
      <h2 className="text-2xl font-extrabold mb-10">Profile</h2>
      <div className="flex flex-col items-center py-2 gap-y-8">
        {user.company && <p>Company : {user.company.name}</p>}
        <p>Email : {user.staff.email}</p>
        <p>First Name : {user.staff.firstname}</p>
        <p>Last Name : {user.staff.lastname}</p>
        {user.company && <p>Terminal : {user.staff.terminal}</p>}
      </div>
    </div>
  );
};

export default DashboardProfile;
