import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeBus } from "../features/userSlice";
import StaffBusModal from "./StaffBusModal";

export default function BusTable() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [busId, setBusId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [staffBusModal, setStaffBusModal] = useState(false);

  return (
    <div>
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Buses
        </button>
      </div>
      <div>
        <Paper className="w-full lg:w-3/4 my-10 mx-auto">
          {user.company.buses.length > 1 ? (
            <h2 className="font-bold text-center">{user.company.name} Buses</h2>
          ) : (
            <h2 className="font-bold text-center">{user.company.name} Bus</h2>
          )}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-black text-white">Name</TableCell>
                  <TableCell className="bg-black text-white">
                    PlateNumber
                  </TableCell>
                  <TableCell className="bg-black text-white">Seats</TableCell>
                  <TableCell className="bg-black text-white">
                    Added By
                  </TableCell>
                  <TableCell className="bg-black ">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.company.buses.map((row) => (
                  <TableRow key={row._id} hover>
                    <TableCell className="font-bold">{row.name}</TableCell>
                    <TableCell>{row.plateNumber}</TableCell>
                    <TableCell>{row.seats}</TableCell>
                    <TableCell>{row.addedBy?.name}</TableCell>
                    <TableCell
                      onClick={() => {
                        setBusId(row._id);
                        setCompanyId(user.company._id);
                        setStaffBusModal(true);
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
      </div>
      {staffBusModal && (
        <StaffBusModal
          setStaffBusModal={setStaffBusModal}
          busId={busId}
          companyId={companyId}
          setBusId={setBusId}
          setCompanyId={setCompanyId}
        />
      )}
    </div>
  );
}
