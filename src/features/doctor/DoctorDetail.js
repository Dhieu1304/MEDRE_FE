import { Favorite, FavoriteBorder, RateReviewRounded } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography
} from "@mui/material";

import formatDate from "date-and-time";
import PropTypes from "prop-types";
import CustomModal, { useCustomModal } from "../../components/CustomModal";
import { getNext7DaysFrom } from "../../utils/datetimeUtil";
import BookingButton, { EMPTY, BOOKED, EMPTY_PAST, RESERVED, BUSY } from "./components/BookingButton";
import ExpertiseButton from "./components/ExpertiseButton";

const createData = (name) => {
  const row = { d1: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null };
  const newRow = Object.keys(row).reduce((result, key) => {
    const index = Math.floor(Math.random() * 5) + 1;
    switch (index) {
      case 2:
        return {
          ...result,
          [key]: BOOKED
        };
      case 3:
        return {
          ...result,
          [key]: EMPTY_PAST
        };
      case 4:
        return {
          ...result,
          [key]: RESERVED
        };
      case 5:
        return {
          ...result,
          [key]: BUSY
        };
      case 1:
      default:
        return {
          ...result,
          [key]: EMPTY
        };
    }
  }, {});

  return {
    name,
    ...newRow
  };
  // return { name, d1, d2, d3, d4, d5, d6, d7 };
};

const rows = [
  createData("7h30 - 8h"),
  createData("8h - 8h30"),
  createData("8h30 - 9h"),
  createData("9h - 9h30"),
  createData("9h30 - 10h"),
  createData("10h - 10h30"),
  createData("10h30 - 11h"),
  createData("11h - 11h30"),
  createData("13h - 13h30"),
  createData("13h30 - 14h"),
  createData("14h - 14h30"),
  createData("14h30 - 15h"),
  createData("15h - 15h30"),
  createData("15h30 - 16h"),
  createData("16h - 16h30")
];

const heads = getNext7DaysFrom();

function DoctorDetail({ isLiked }) {
  const bookingModal = useCustomModal();

  const renderCell = (variant) => {
    let handleClick;
    switch (variant) {
      case EMPTY:
        handleClick = () => {
          bookingModal.setShow(true);
        };
        break;
      default:
        break;
    }

    return <BookingButton variant={variant} onClick={handleClick} />;
  };

  return (
    <>
      <Grid container>
        <Grid item lg={12}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              p: 0,
              cursor: "pointer",
              border: "none"
            }}
          >
            <CardHeader
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              action={
                <>
                  <IconButton ariant="contained" size="small">
                    <RateReviewRounded color="red" />
                  </IconButton>
                  <IconButton ariant="contained" size="small">
                    {isLiked ? <Favorite color="red" /> : <FavoriteBorder color="red" />}
                  </IconButton>
                </>
              }
              title="Keegan"
            />
            <CardContent sx={{ flexGrow: 1, pt: 0 }}>
              <Box>
                <Typography>
                  Hơn 20 năm kinh nghiệm làm việc chuyên sâu trong lĩnh vực trị liệu tâm lý, tham vấn tâm lý và giáo cho trẻ
                  em và vị thành niên
                </Typography>
              </Box>
              <Box>
                <Box>
                  <Typography>Specialties</Typography>
                  <Box>
                    {["Tâm lý", "Răng hàm mặt", "Tai mũi họng"].map((expertise) => (
                      <ExpertiseButton key={expertise} label={expertise} />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography>Education</Typography>
                <Box>
                  <List>
                    <ListItem>Đại học y dược</ListItem>
                    <ListItem>Đại học Harvard</ListItem>
                  </List>
                </Box>
              </Box>
              <Box>
                <Typography>Certificate</Typography>
                <Box>
                  <List>
                    <ListItem>Đại học y dược</ListItem>
                    <ListItem>Đại học Harvard</ListItem>
                  </List>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Ca / Ngày</TableCell>
                  {heads.map((cell) => {
                    return (
                      <TableCell key={cell} align="right">
                        {formatDate.format(cell, "DD/MM")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    {}

                    <TableCell align="center">{renderCell(row.d1)}</TableCell>
                    <TableCell align="center">{renderCell(row.d2)}</TableCell>
                    <TableCell align="center">{renderCell(row.d3)}</TableCell>
                    <TableCell align="center">{renderCell(row.d4)}</TableCell>
                    <TableCell align="center">{renderCell(row.d5)}</TableCell>
                    <TableCell align="center">{renderCell(row.d6)}</TableCell>
                    <TableCell align="center">{renderCell(row.d7)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <CustomModal show={bookingModal.show} setShow={bookingModal.setShow} />
    </>
  );
}

DoctorDetail.propTypes = {
  isLiked: PropTypes.bool.isRequired
};

export default DoctorDetail;
