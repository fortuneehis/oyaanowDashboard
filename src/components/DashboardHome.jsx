import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.bookings);

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-black text-white">Name</TableCell>
                <TableCell className="bg-black text-white">Email</TableCell>
                <TableCell className="bg-black text-white">Phone</TableCell>
                <TableCell className="bg-black text-white">TicketID</TableCell>
                <TableCell className="bg-black text-white">Routing</TableCell>
                <TableCell className="bg-black text-white">Seats</TableCell>
                <TableCell className="bg-black text-white">Created</TableCell>
                <TableCell className="bg-black text-white">Departure</TableCell>
                <TableCell className="bg-black text-white">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Phone}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>{row.TicketID}</TableCell>
                  <TableCell>{row.Routing}</TableCell>
                  <TableCell>{row.Seats}</TableCell>
                  <TableCell>{row.Created}</TableCell>
                  <TableCell>{row.Departure}</TableCell>
                  <TableCell>{row.Position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
