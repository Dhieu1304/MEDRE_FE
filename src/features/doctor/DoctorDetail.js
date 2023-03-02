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
  Typography
} from "@mui/material";

import formatDate from "date-and-time";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useCustomModal } from "../../components/CustomModal";
import doctorServices from "../../services/doctorServices";
import scheduleServices from "../../services/scheduleServices";
import { getNext7DaysFrom } from "../../utils/datetimeUtil";
import BookingButton, { EMPTY, BOOKED, EMPTY_PAST, RESERVED, BUSY } from "./components/BookingButton";
import BookingModal from "./components/BookingModal";
import ExpertiseButton from "./components/ExpertiseButton";

const groupArrayByKey = (arr, keys, key) => {
  const defaultGroups = keys.reduce((group, keyi) => ({ ...group, [keyi]: [] }), {});

  return arr.reduce(
    (groups, item) => {
      const value = item[key];
      if (groups[value]) {
        groups[value].push(item);
      }
      return groups;
    },
    { ...defaultGroups }
  );
};

const createData = (name, schedules, currentDate) => {
  const row = schedules.reduce(
    (newRow, schedule) => {
      const count = Math.ceil(formatDate.subtract(new Date(schedule?.date), currentDate).toDays());
      const key = `d${count}`;
      const index = Math.floor(Math.random() * 5) + 1;
      switch (index) {
        case 2:
          return {
            ...newRow,
            [key]: { variant: BOOKED, data: schedule }
          };
        case 3:
          return {
            ...newRow,
            [key]: { variant: EMPTY_PAST, data: schedule }
          };
        case 4:
          return {
            ...newRow,
            [key]: { variant: RESERVED, data: schedule }
          };
        case 5:
          return {
            ...newRow,
            [key]: { variant: BUSY, data: schedule }
          };
        case 1:
        default:
          return {
            ...newRow,
            [key]: { variant: EMPTY, data: schedule }
          };
      }
    },
    { d1: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null }
  );

  return {
    name,
    ...row
  };
};

const createDatas = (times, schedules, currentDate) => {
  // const createDatas = (times) => {
  const groupSchedule = groupArrayByKey(
    schedules,
    times.map((time) => time.name),
    "time"
  );

  return Object.keys(groupSchedule).map((time) => {
    return createData(time, groupSchedule[time], currentDate);
  });

  // return times.map((time) => {
  //   const name = time?.name;
  //   const row = { d1: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null };
  //   const newRow = Object.keys(row).reduce((result, key) => {
  //     const index = Math.floor(Math.random() * 5) + 1;
  //     switch (index) {
  //       case 2:
  //         return {
  //           ...result,
  //           [key]: BOOKED
  //         };
  //       case 3:
  //         return {
  //           ...result,
  //           [key]: EMPTY_PAST
  //         };
  //       case 4:
  //         return {
  //           ...result,
  //           [key]: RESERVED
  //         };
  //       case 5:
  //         return {
  //           ...result,
  //           [key]: BUSY
  //         };
  //       case 1:
  //       default:
  //         return {
  //           ...result,
  //           [key]: EMPTY
  //         };
  //     }
  //   }, {});

  //   return {
  //     name,
  //     ...newRow
  //   };
  //   // return { name, d1, d2, d3, d4, d5, d6, d7 };
  // });
};
function DoctorDetail() {
  const [doctor, setDoctor] = useState();
  const [schedules, setSchedules] = useState([]);
  const [times, setTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookingModal = useCustomModal();

  const params = useParams();
  const doctorId = useMemo(() => params?.doctorId, [params?.doctorId]);

  const renderCell = (cell) => {
    const variant = cell?.variant;
    const data = cell?.data;
    let handleClick;
    switch (variant) {
      case EMPTY:
        handleClick = () => {
          bookingModal.setShow(true);
          bookingModal.setData(data);
          setCurrentDate((prev) => prev);
        };
        break;
      default:
        break;
    }

    return <BookingButton variant={variant} onClick={handleClick} />;
  };

  useEffect(() => {
    const loadData = async () => {
      const res1 = await doctorServices.getDoctorDetail(doctorId);
      const doctorData = res1.doctor;
      setDoctor(doctorData);

      const res2 = await scheduleServices.getScheduleList();
      const schedulesData = res2.schedules;
      setSchedules(schedulesData);

      const res3 = await scheduleServices.getTimeList();
      const timesData = res3.times;
      setTimes(timesData);
    };
    loadData();
  }, []);

  const heads = useMemo(() => getNext7DaysFrom(currentDate), [currentDate]);
  const rows = useMemo(() => createDatas(times, schedules, currentDate), [times, schedules, currentDate]);

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
              title={doctor?.name}
              subheader={`(${doctor?.certificate})`}
            />
            <CardContent sx={{ flexGrow: 1, pt: 0 }}>
              <Box>
                <Typography>{doctor?.description}</Typography>
              </Box>
              <Box>
                <Box>
                  <Typography>Specialties</Typography>
                  <Box>
                    {doctor?.doctorExpertises?.map((expertise) => (
                      <ExpertiseButton key={expertise?.id} label={expertise?.name} />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography>Education: {doctor?.education}</Typography>
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
      {bookingModal.show && (
        <BookingModal
          show={bookingModal.show}
          setShow={bookingModal.setShow}
          data={bookingModal.data}
          setData={bookingModal.setData}
        />
      )}
    </>
  );
}

export default DoctorDetail;
