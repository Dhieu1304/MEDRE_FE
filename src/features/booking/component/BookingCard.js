import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid
} from "@mui/material";

// import PropTypes from "prop-types";
import formatDate from "date-and-time";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { formatDateLocale } from "../../../utils/datetimeUtil";

import ExpertiseButton from "../../doctor/components/ExpertiseButton";

function BookingCard() {
  //   const navigate = useNavigate();

  const appConfigStore = useAppConfigStore();

  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation("bookingFeature", { keyPrefix: "booking_card" });

  useMemo(() => {
    const locale = appConfigStore.locale.slice(0, 2);
    const currentLocale = formatDateLocale[locale] || formatDateLocale.en;
    formatDate.locale(currentLocale);
  }, [appConfigStore.locale]);
  const date = new Date();

  const bookingId = 1;

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid rgba(0,0,0,0.1)",
        mb: 10
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5">{formatDate.format(date, "ddd, DD/MM/YY")}</Typography>
            <Typography variant="body2" sx={{ color: "red" }}>
              <Countdown date={Date.now() + 100000} />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ flexGrow: 1 }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" alt="Sang" />}
            title="Nguyễn Đình Hiệu"
            subheader="(Phó giáo sư, tiến sĩ)"
            sx={{
              m: 0,
              p: 0
            }}
          />
          <CardContent sx={{ flexGrow: 1, pt: 0 }}>
            <Box>
              {[
                {
                  id: 1,
                  name: "Răng hàm mặt"
                },
                {
                  id: 2,
                  name: "Tiểu phẩu"
                }
              ].map((expertise) => (
                <ExpertiseButton key={expertise?.id} label={expertise?.name} />
              ))}
            </Box>
            <Typography>
              Hơn 20 năm kinh nghiệm làm việc chuyên sâu trong lĩnh vực trị liệu tâm lý, tham vấn tâm lý và giáo cho trẻ em
              và vị thành niên
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={7} sx={{ flexGrow: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ flexDirection: "column", p: 0, mb: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        {t("time")}
                      </TableCell>
                      <TableCell align="left">10h00-10h20 (Online)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        {t("name")}
                      </TableCell>
                      <TableCell align="left">Trần Ngọc Sang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        {t("status")}
                      </TableCell>
                      <TableCell align="left">Đã thanh toán</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        {t("code")}
                      </TableCell>
                      <TableCell align="left">546456</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  navigate(`${location.pathname}/${bookingId}`);
                }}
              >
                {t("detail_btn_label")}
              </Button>
              {/* <Button variant="contained" size="small">
                Edit
              </Button>
              <Button variant="contained" size="small">
                Cancel
              </Button>
              <Button variant="contained" size="small">
                Thanh toán
              </Button> */}
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

// BookingCard.propTypes = {
//   booking: PropTypes.object.isRequired
// };

export default BookingCard;
