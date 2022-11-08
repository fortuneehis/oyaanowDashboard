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
import { getCompany } from "../features/companySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminTerminalModal from "./AdminTerminalModal";

export default function TerminalTable({ terminals, id, companyName }) {
  const [terminalId, setTerminalId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [adminTerminalModal, setAdminTerminalModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <div>
      <Paper className="w-full lg:w-2/4 my-10 mx-auto">
        {terminals.length > 1 ? (
          <h2 className="font-bold text-center">{companyName} Terminals</h2>
        ) : (
          <h2 className="font-bold text-center">{companyName} Terminal</h2>
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
              {terminals.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.landmark}</TableCell>
                  <TableCell>{row.addedBy?.name}</TableCell>
                  <TableCell
                    onClick={() => {
                      setTerminalId(row._id);
                      setCompanyId(id);
                      setAdminTerminalModal(true);
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
      {adminTerminalModal && (
        <AdminTerminalModal
          terminalId={terminalId}
          setTerminalId={setTerminalId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setAdminTerminalModal={setAdminTerminalModal}
        />
      )}
    </div>
  );
}
