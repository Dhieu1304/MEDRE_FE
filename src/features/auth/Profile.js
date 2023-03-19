import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(info, data) {
  return { info, data };
}

const rows = [
  createData("Name", "Nguyen Dinh Hieu"),
  createData("Gender", "Male"),
  createData("Date of Birth", "19 / 03 / 2022"),
  createData("Address", "Tan Phu, TPHCM"),
  createData("Telephone", "0123456789")
];

export default function Profiles() {
  return (
    <div>
      <div>Infomation</div>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="20pt" aria-label="a dense table">
          {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead> */}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.info} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.info}
                </TableCell>
                <TableCell align="right">{row.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
