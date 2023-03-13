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

import { useMemo, useState } from "react";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { formatDateLocale } from "../../../utils/datetimeUtil";

import ExpertiseButton from "../../doctor/components/ExpertiseButton";
// import { useTranslation } from "react-i18next";

const text = `Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus
at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque
erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec
semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.
Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices
mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper
augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit
ligula in lacus. Curabitur at ipsum ac tellus semper interdum. 2 Morbi ut odio. Cras mi pede,
malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.
Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit
at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.`;

const MAX_REASON_LENGTH = 200;

function BookingCard() {
  //   const navigate = useNavigate();

  const appConfigStore = useAppConfigStore();
  const [showFullReason, setShowFullReason] = useState(false);

  // const { t } = useTranslation("bookingFeature", { keyPrefix: "booking_list.booking_card" });

  useMemo(() => {
    const locale = appConfigStore.locale.slice(0, 2);
    const currentLocale = formatDateLocale[locale] || formatDateLocale.en;
    formatDate.locale(currentLocale);
  }, [appConfigStore.locale]);

  const handleToggleReason = () => {
    setShowFullReason(!showFullReason);
  };

  const date = new Date();

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
                        Ca Khám
                      </TableCell>
                      <TableCell align="left">10h00-10h20</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        Họ tên bệnh nhân
                      </TableCell>
                      <TableCell align="left">Trần Ngọc Sang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        012456789
                      </TableCell>
                      <TableCell align="left">Sang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        Tình trạng
                      </TableCell>
                      <TableCell align="left">Online</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        Đã thanh toán
                      </TableCell>
                      <TableCell align="left">Online</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width="30%">
                        Code tham gia
                      </TableCell>
                      <TableCell align="left">546456</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        width="30%"
                        sx={{
                          verticalAlign: "top"
                        }}
                      >
                        Lý do khám
                      </TableCell>
                      <TableCell align="left">
                        <Box>
                          <Typography variant="body1">
                            {showFullReason ? text : `${text.substring(0, MAX_REASON_LENGTH)}...`}
                          </Typography>
                          {text.length > MAX_REASON_LENGTH && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                              <Button onClick={handleToggleReason} color="primary">
                                {showFullReason ? "Thu gọn" : "Xem thêm"}
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" size="small">
                Edit
              </Button>
              <Button variant="contained" size="small">
                Cancel
              </Button>
              <Button variant="contained" size="small">
                Thanh toán
              </Button>
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
