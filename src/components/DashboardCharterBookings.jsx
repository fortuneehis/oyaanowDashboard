import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getBusCharter } from "../features/bookings/bookingsSlice";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [todayValue, setTodayValue] = useState("");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    dispatch(getBusCharter());
  }, [dispatch]);

  const { busCharter } = useSelector((state) => state.bookings);
  return (
    <div className="max-w-full">
      <div className="w-full flex  items-center justify-between px-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="my-4 border py px-4 focus:outline-none"
          type="text"
          placeholder="Search Bookings"
        />

        <select
          onChange={(e) => {
            setTodayValue(e.target.value);
          }}
          className="focus:outline-none w-2/6 border px-2"
        >
          <option value="">Default</option>
          <option value={today}>Today</option>
        </select>
      </div>

      <Paper className="w-full lg:w-4/4 mx-auto">
        <h3 className="text-lg font-bold mx-auto">Bus Charter Bookings</h3>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="text-center bg-black text-white">
                  Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Phone Number
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Number of Bus(es)
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Departure Date
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Created At
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Ticket ID
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  State To
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  State From
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {busCharter
                .filter((customer) => {
                  return search.toLowerCase() === ""
                    ? customer
                    : customer._id.includes(search);
                })
                .filter((customer) => {
                  const bookingDate = customer.departureDate;
                  var todays = new Date(bookingDate);
                  var dd = String(todays.getDate()).padStart(2, "0");
                  var mm = String(todays.getMonth() + 1).padStart(2, "0");
                  var yyyy = todays.getFullYear();

                  todays = yyyy + "-" + mm + "-" + dd;
                  console.log(todays);
                  console.log(todayValue);
                  if (todayValue === "") {
                    return customer;
                  } else if (todayValue === todays) {
                    return customer;
                  }
                })
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="text-center font-bold">
                      {row.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.busNumber}
                    </TableCell>

                    <TableCell className="text-center">
                      {row.departureDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.createdAt}
                    </TableCell>
                    <TableCell className="text-center">{row._id}</TableCell>
                    <TableCell className="text-center">
                      {row.state.to}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.state.from}
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
