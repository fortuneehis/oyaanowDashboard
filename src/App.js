import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";
import DashboardProfile from "./components/DashboardProfile";
import DashboardBookings from "./components/DashboardBookings";
import DashboardCompanies from "./components/DashboardCompanies";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardCompany from "./components/DashboardCompany";
import PrivateRoutesDashboard from "./components/PrivateRoutesDashboard";
import RegisterCompany from "./components/RegisterCompany";
import DashboardStaffBookings from "./components/DashboardStaffBookings";
import DubaiVisa from "./components/DubaiVisa";
import CompanyModal from "./components/CompanyModal";
import PersonalPageLoader from "./components/PersonalPageLoader";
import DashboardCharterBookings from "./components/DashboardCharterBookings";
import NyscBookings from "./components/NyscBookings";
import PrivateRegister from "./components/PrivateRegister";

function App() {
  const [companyModal, setCompanyModal] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const { getCompanyStatus } = useSelector((state) => state.company);
  const {
    isLoading,
    addBusStatus,
    addTerminalStatus,
    removeTerminalStatus,
    removeBusStatus,
    addRouteStatus,
    removeRouteStatus,
  } = useSelector((state) => state.user);
  const {
    getStaffCustomersStatus,
    getBusCharterStatus,
    getDubaiVisaStatus,
    getCustomersStatus,
  } = useSelector((state) => state.bookings);
  const { getCompaniesStatus, getStaffsStatus } = useSelector(
    (state) => state.staff
  );

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRegister />}>
          <Route path="/registerUser" element={<Register />} />
          <Route path="/registerCompany" element={<RegisterCompany />} />
        </Route>

        <Route element={<PrivateRoutesDashboard />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route path="/dashboard/home" element={<DashboardHome />} />
            <Route path="/dashboard/company" element={<DashboardCompany />} />

            <Route path="/dashboard/bookings" element={<DashboardBookings />} />

            <Route path="/dashboard/dubai" element={<DubaiVisa />} />
            <Route
              path="/dashboard/charter"
              element={<DashboardCharterBookings />}
            />
            <Route
              path="/dashboard/staffbookings"
              element={<DashboardStaffBookings />}
            />
            <Route
              path="/dashboard/companies"
              element={<DashboardCompanies />}
            />
            <Route path="/dashboard/nysc" element={<NyscBookings />} />
            <Route
              path="/dashboard/admin"
              element={
                <DashboardAdmin
                  companyModal={companyModal}
                  companyId={companyId}
                  setCompanyId={setCompanyId}
                  setCompanyModal={setCompanyModal}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
      {getCompanyStatus === "loading" ||
      addBusStatus === "loading" ||
      addTerminalStatus === "loading" ||
      removeTerminalStatus === "loading" ||
      removeBusStatus === "loading" ||
      addRouteStatus === "loading" ||
      removeRouteStatus === "loading" ||
      getStaffCustomersStatus === "loading" ||
      getBusCharterStatus === "loading" ||
      getDubaiVisaStatus === "loading" ||
      getCustomersStatus === "loading" ||
      getCompaniesStatus === "loading" ||
      getStaffsStatus === "loading" ? (
        <PersonalPageLoader />
      ) : null}
    </div>
  );
}

export default App;
