import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StaffRouteModal from "./StaffRouteModal";

export default function RouteTable({
  reservation,
  setReservation,
  setReservationModal,
}) {
  const { user } = useSelector((state) => state.user);
  const [routeId, setRouteId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [staffRouteModal, setStaffRouteModal] = useState(false);

  return (
    <div>
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Routes
        </button>
      </div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {user.company.routes.length > 1 ? (
          <h2 className="font-bold text-center">{user.company.name} Routes</h2>
        ) : (
          <h2 className="font-bold text-center">{user.company.name} Route</h2>
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
              {user.company.routes.map((row) => (
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
                      setCompanyId(user.company._id);
                      setStaffRouteModal(true);
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
      {staffRouteModal && (
        <StaffRouteModal
          routeId={routeId}
          setRouteId={setRouteId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setStaffRouteModal={setStaffRouteModal}
        />
      )}
    </div>
  );
}
