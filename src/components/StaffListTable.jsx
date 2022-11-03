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
import { getCompanies, removeCompany } from "../features/staffSlice";
import StaffListModal from "./StaffListModal";

import DeleteIcon from "@mui/icons-material/Delete";

export default function StaffListTable() {
  const { staff } = useSelector((state) => state.staff);

  const [staffModal, setStaffModal] = useState(false);
  const [staffId, setStaffId] = useState("");
  const staffList = staff.filter((staff) => {
    if (!staff.roles.superAdmin) {
      return staff;
    }
  });

  const dispatch = useDispatch();

  return (
    <div>
      {staff.length > 0 ? (
        <Paper className="w-full lg:w-3/4 my-10 mx-auto">
          {staff.length > 1 ? (
            <h2 className="font-bold text-center">Oyaanow Staffs</h2>
          ) : (
            <h2 className="font-bold text-center">Oyaanow Staff</h2>
          )}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-black text-white">
                    FirstName
                  </TableCell>
                  <TableCell className="bg-black text-white">
                    LastName
                  </TableCell>
                  <TableCell className="bg-black text-white">Role</TableCell>
                  <TableCell className="bg-black text-white">Email</TableCell>
                  <TableCell className="bg-black text-white">Company</TableCell>
                  <TableCell className="bg-black text-white">
                    Phone Number
                  </TableCell>
                  <TableCell className="bg-black text-white">
                    Terminal
                  </TableCell>

                  <TableCell className="bg-black text-black">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff
                  ? staff.map((row) => (
                      <TableRow>
                        <TableCell>{row.firstname}</TableCell>
                        <TableCell>{row.lastname}</TableCell>
                        {row.roles.staff && !row.roles.admin ? (
                          <TableCell>Staff</TableCell>
                        ) : null}
                        {row.roles.staff &&
                        row.roles.admin &&
                        row.roles.superAdmin ? (
                          <TableCell>Super Admin</TableCell>
                        ) : null}
                        {row.roles.staff &&
                        row.roles.admin &&
                        !row.roles.superAdmin ? (
                          <TableCell>Admin</TableCell>
                        ) : null}
                        <TableCell>{row.email}</TableCell>
                        <TableCell className="font-bold">
                          {row.companyName}
                        </TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.terminal}</TableCell>
                        <TableCell
                          onClick={() => {
                            setStaffId(row._id);
                            setStaffModal(true);
                          }}
                        >
                          <DeleteIcon className="cursor-pointer hover:scale-105 transition" />
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
      {staffModal && (
        <StaffListModal
          setStaffModal={setStaffModal}
          staffId={staffId}
          setStaffId={setStaffId}
        />
      )}
    </div>
  );
}
