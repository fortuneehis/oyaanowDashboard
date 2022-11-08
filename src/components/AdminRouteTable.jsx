import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCompany } from "../features/companySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminRouteModal from "./AdminRouteModal";

export default function RouteTable({
  routes,
  id,
  companyName,
  reservation,
  setReservation,
  setReservationModal,
}) {
  const [routeId, setRouteId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [adminRouteModal, setAdminRouteModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <div>
      <Paper className="w-4/4 lg:w-4/4 my-10 mx-auto">
        {routes.length > 1 ? (
          <h2 className="font-bold text-center">{companyName} Routes</h2>
        ) : (
          <h2 className="font-bold text-center">{companyName} Route</h2>
        )}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-black text-white text-center">
                  State To
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  State From
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Terminal To
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Terminal From
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Departure Time
                </TableCell>
                <TableCell className="bg-black text-white text-center ">
                  Departure Date
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Recurring
                </TableCell>

                <TableCell className="bg-black text-white text-center">
                  Bus
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Fare
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Booked Seats
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Available Seats
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Reservations
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Added By
                </TableCell>
                <TableCell className="bg-black  text-center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell className="text-center">{row.state.to}</TableCell>
                  <TableCell>{row.state.from}</TableCell>
                  <TableCell className="text-center">
                    {row.terminal.to.landmark}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.terminal.from.landmark}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.departureTimes}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.departureDate}
                  </TableCell>
                  <TableCell className="text-center">{row.recurring}</TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].name}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].fare}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].bookedSeats}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].availableSeats}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => {
                        setReservation(row.buses[0].reservations);
                        setReservationModal(true);
                        console.log(reservation);
                      }}
                      className="border transition hover:scale-105 active:scale-90"
                    >
                      Click to View
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    {row.addedBy?.name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setRouteId(row._id);
                      setCompanyId(id);
                      setAdminRouteModal(true);
                    }}
                  >
                    <DeleteIcon className="cursor-pointer hover:scale-105 transition" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {adminRouteModal && (
        <AdminRouteModal
          routeId={routeId}
          setRouteId={setRouteId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setAdminRouteModal={setAdminRouteModal}
        />
      )}
    </div>
  );
}
