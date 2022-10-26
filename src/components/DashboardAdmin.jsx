import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getAllStaff, getCompanies } from "../features/staffSlice";
import CompanyTable from "./CompanyTable";
import { useDispatch } from "react-redux";
import StaffListTable from "./StaffListTable";
import CompanyModal from "./CompanyModal";

const DashboardAdmin = ({
  companyId,
  setCompanyId,
  setCompanyModal,
  companyModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerCompany = () => {
    navigate("/registerCompany");
  };
  const registerUser = () => {
    navigate("/registerUser");
  };
  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getAllStaff());
  }, []);
  return (
    <div className="w-full">
      <CompanyTable
        companyId={companyId}
        setCompanyId={setCompanyId}
        setCompanyModal={setCompanyModal}
      />
      <StaffListTable />
      <div className="flex space-x-4 justify-center">
        <button
          onClick={registerUser}
          className="border px-2 py-1 transition hover:scale-105 active:scale-90"
        >
          Register a User
        </button>
        <button
          onClick={registerCompany}
          className="border px-2 py-1 transition hover:scale-105 active:scale-90"
        >
          Register a Company
        </button>
      </div>
      {companyModal && (
        <CompanyModal
          setCompanyModal={setCompanyModal}
          companyId={companyId}
          setCompanyId={setCompanyId}
          companyModal={companyModal}
        />
      )}
    </div>
  );
};

export default DashboardAdmin;
