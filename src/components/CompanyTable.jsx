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

import DeleteIcon from "@mui/icons-material/Delete";

export default function CompanyTable({
  companyId,
  setCompanyId,
  setCompanyModal,
}) {
  const { company } = useSelector((state) => state.staff);

  const dispatch = useDispatch();

  return (
    <div>
      {company.length > 0 ? (
        <Paper className="w-full lg:w-2/4 my-10 mx-auto">
          {company.length > 1 ? (
            <h2 className="font-bold text-center">Oyaanow Companies</h2>
          ) : (
            <h2 className="font-bold text-center">Oyaanow Company</h2>
          )}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-black text-white">Name</TableCell>
                  <TableCell className="bg-black text-white">Email</TableCell>
                  <TableCell className="bg-black text-white">
                    Last Update By
                  </TableCell>
                  <TableCell className="bg-black text-black">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {company.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="font-bold">{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.lastUpdatedBy.name}</TableCell>
                    <TableCell
                      onClick={() => {
                        setCompanyModal(true);
                        setCompanyId(row._id);
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
      ) : null}
    </div>
  );
}
