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
import { getCustomers } from "../features/bookings/bookingsSlice";

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
    dispatch(getCustomers());
  }, [dispatch]);

  const { customers } = useSelector((state) => state.bookings);
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
        <h3 className="text-lg font-bold mx-auto">Nysc Bookings</h3>
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
                  TicketId
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Terminal To
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Terminal From
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Departure Date
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  CreatedAt
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Gender
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Bus
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Seat
                </TableCell>

                <TableCell className="text-center bg-black text-white">
                  Time
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Transaction Reference
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Price
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Company
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Kin Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Kin Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Kin PhoneNumber
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .filter((customer) => {
                  if (customer.nysc === "nysc") {
                    return customer;
                  }
                })
                .filter((customer) => {
                  return search.toLowerCase() === ""
                    ? customer
                    : customer.ticketId?.includes(search);
                })
                .filter((customer) => {
                  const bookingDate = customer.createdAt;
                  var todays = new Date(bookingDate);
                  var dd = String(todays.getDate()).padStart(2, "0");
                  var mm = String(todays.getMonth() + 1).padStart(2, "0");
                  var yyyy = todays.getFullYear();

                  todays = yyyy + "-" + mm + "-" + dd;

                  if (todayValue === "") {
                    return customer;
                  } else if (todayValue === todays) {
                    return customer;
                  }
                })
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="text-center font-bold">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-center">{row.email}</TableCell>
                    <TableCell className="text-center">
                      {row.phoneNumber}
                    </TableCell>

                    <TableCell className="text-center">
                      {row.state.to}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.state.from}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.ticketId}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.terminal.to}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.terminal.from}
                    </TableCell>
                    <TableCell className="text-center">{row.date}</TableCell>
                    <TableCell className="text-center">
                      {row.createdAt}
                    </TableCell>
                    <TableCell className="text-center">{row.gender}</TableCell>
                    <TableCell className="text-center">{row.bus}</TableCell>
                    <TableCell className="text-center">{row.seat}</TableCell>

                    <TableCell className="text-center">{row.time}</TableCell>
                    <TableCell className="text-center">
                      {row.transactionRef}
                    </TableCell>
                    <TableCell className="text-center">{row.price}</TableCell>
                    <TableCell className="text-center">{row.company}</TableCell>
                    <TableCell className="text-center">
                      {row.kin.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.kin.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.kin.phoneNumber}
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
