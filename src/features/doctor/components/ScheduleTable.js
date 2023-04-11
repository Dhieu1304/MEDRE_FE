import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme
} from "@mui/material";

import formatDate from "date-and-time";
import { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useCustomModal } from "../../../components/CustomModal";
import scheduleServices from "../../../services/scheduleServices";
import { getNext7DaysFrom } from "../../../utils/datetimeUtil";
import BookingButton, { EMPTY, BOOKED, EMPTY_PAST, RESERVED, BUSY } from "./BookingButton";
import BookingModal from "./BookingModal";

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

function ScheduleTable() {
  const [schedules, setSchedules] = useState([]);
  const [times, setTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const bookingModal = useCustomModal();

  const theme = useTheme();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "ScheduleTable" });

  useEffect(() => {
    const loadData = async () => {
      const res2 = await scheduleServices.getScheduleList();
      const schedulesData = res2.schedules;
      setSchedules(schedulesData);

      const res3 = await scheduleServices.getTimeList();
      const timesData = res3.times;
      setTimes(timesData);
    };
    loadData();
  }, []);

  const renderCell = (cell) => {
    let variant = cell?.variant;
    variant = EMPTY;
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

  const heads = useMemo(() => getNext7DaysFrom(currentDate), [currentDate]);
  const rows = useMemo(() => createDatas(times, schedules, currentDate), [times, schedules, currentDate]);

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "600",
          mb: 4
        }}
      >
        Lịch khám bệnh trong tuấn
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button
            variant="outlined"
            type="button"
            sx={{
              fontWeight: "600"
            }}
          >
            {formatDate.format(heads[0], "DD/MM")} - {formatDate.format(heads[6], "DD/MM")}
          </Button>
        </Box>
        <IconButton
          onClick={() => {
            const newCurrentDate = new Date(currentDate);
            newCurrentDate.setDate(newCurrentDate.getDate() - 6);
            setCurrentDate(() => newCurrentDate);
          }}
        >
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentDate(() => new Date());
          }}
          size="small"
        >
          {t("currentWeek")}
        </Button>
        <IconButton
          onClick={() => {
            const newCurrentDate = new Date(currentDate);
            newCurrentDate.setDate(newCurrentDate.getDate() + 6);
            setCurrentDate(() => newCurrentDate);
          }}
        >
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  border: "1px solid rgba(0,0,0,0.1)"
                }}
              />
              {heads.map((cell) => {
                const isToday = formatDate.isSameDay(new Date(), cell);

                return (
                  <TableCell
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      fontWeight: "600",
                      backgroundColor: isToday && theme.palette.success.light,
                      color: isToday && theme.palette.success.contrastText
                    }}
                    key={cell}
                    align="center"
                  >
                    {formatDate.format(cell, "DD/MM")}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    fontWeight: "600"
                  }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d1)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d2)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d3)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d4)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d5)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d6)}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)"
                  }}
                  align="center"
                >
                  {renderCell(row.d7)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ScheduleTable;
