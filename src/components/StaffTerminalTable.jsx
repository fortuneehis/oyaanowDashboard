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
import StaffTerminalModal from "./StaffTerminalModal";

export default function TerminalTable() {
  const { user } = useSelector((state) => state.user);

  const [terminalId, setTerminalId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [staffTerminalModal, setStaffTerminalModal] = useState(false);

  return (
    <div>
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Terminals
        </button>
      </div>
      <Paper className="w-full lg:w-2/4 my-10 mx-auto">
        {user.company.terminals.length > 1 ? (
          <h2 className="font-bold text-center">
            {user.company.name} Terminals
          </h2>
        ) : (
          <h2 className="font-bold text-center">
            {user.company.name} Terminal
          </h2>
        )}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-black text-white">Location</TableCell>
                <TableCell className="bg-black text-white">Address</TableCell>
                <TableCell className="bg-black text-white">Landmark</TableCell>
                <TableCell className="bg-black text-white">Added By</TableCell>
                <TableCell className="bg-black ">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.company.terminals.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell className="font-bold">{row.location}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.landmark}</TableCell>
                  <TableCell>{row.addedBy?.name}</TableCell>
                  <TableCell
                    onClick={() => {
                      setTerminalId(row._id);
                      setCompanyId(user.company._id);
                      setStaffTerminalModal(true);
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
      {staffTerminalModal && (
        <StaffTerminalModal
          terminalId={terminalId}
          setTerminalId={setTerminalId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setStaffTerminalModal={setStaffTerminalModal}
        />
      )}
    </div>
  );
}
