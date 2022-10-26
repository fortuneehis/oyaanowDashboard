import * as React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import { getStaffCustomers } from "../features/bookings/bookingsSlice";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getStaffCustomers());
  }, [dispatch]);

  const { staffCustomers } = useSelector((state) => state.bookings);
  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h3 className="text-lg font-bold mx-auto">Customer Bookings</h3>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="text-center bg-black text-white">
                  Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Phone Number
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  State To
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  State From
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Terminal To
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Terminal From
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Gender
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Bus
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Seats
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Price
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Company
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Kin
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffCustomers.map((row) => (
                <TableRow hover key={row._id}>
                  <TableCell className="text-center font-bold">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-center">{row.email}</TableCell>
                  <TableCell className="text-center">
                    {row.phoneNumber}
                  </TableCell>

                  <TableCell className="text-center">{row.state.to}</TableCell>
                  <TableCell className="text-center">
                    {row.state.from}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.terminal.to}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.terminal.from}
                  </TableCell>
                  <TableCell className="text-center">{row.gender}</TableCell>
                  <TableCell className="text-center">{row.bus}</TableCell>
                  <TableCell className="text-center">{row.seats}</TableCell>
                  <TableCell className="text-center">{row.price}</TableCell>
                  <TableCell className="text-center">{row.company}</TableCell>
                  <TableCell className="text-center">
                    {row.kin.firstname}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
      </Paper>
    </div>
  );
}
