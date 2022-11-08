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
import { removeBus } from "../features/companySlice";
import AdminBusModal from "./AdminBusModal";

export default function BusTable({ buses, id, companyName }) {
  const [busId, setBusId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [adminBusModal, setAdminBusModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <div>
      <Paper className="w-4/4 lg:w-3/4 my-10 mx-auto">
        {buses.length > 1 ? (
          <h2 className="font-bold text-center">{companyName} Buses</h2>
        ) : (
          <h2 className="font-bold text-center">{companyName} Bus</h2>
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
                <TableCell className="bg-black text-white">Added By</TableCell>
                <TableCell className="bg-black ">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buses.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell className="font-bold">{row.name}</TableCell>
                  <TableCell>{row.plateNumber}</TableCell>
                  <TableCell>{row.seats}</TableCell>
                  <TableCell>{row.addedBy?.name}</TableCell>
                  <TableCell
                    onClick={() => {
                      setBusId(row._id);
                      setCompanyId(id);
                      setAdminBusModal(true);
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
      {adminBusModal && (
        <AdminBusModal
          setAdminBusModal={setAdminBusModal}
          busId={busId}
          companyId={companyId}
          setBusId={setBusId}
          setCompanyId={setCompanyId}
        />
      )}
    </div>
  );
}
