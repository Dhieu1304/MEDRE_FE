import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const reason = `Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus
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

const note = `Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus
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

function BookingDetail() {
  const { t } = useTranslation("bookingFeature", { keyPrefix: "booking_detail" });
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t("title")}
        </Typography>

        <Button variant="contained" size="small" onClick={() => {}}>
          {t("export")}
        </Button>
      </Box>

      <Box sx={{ flexDirection: "column", p: 4, mb: 2, border: "1px solid rgba(0,0,0,0.2)" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("doctor")}
                </TableCell>
                <TableCell align="left">Nguyễn Đình Hiệu</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("expertise")}
                </TableCell>
                <TableCell align="left">Răng hàm mặt, tiểu phẩu</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("time")}
                </TableCell>
                <TableCell align="left">10h00-10h20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("name")}
                </TableCell>
                <TableCell align="left">Trần Ngọc Sang</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("phone")}
                </TableCell>
                <TableCell align="left">Sang</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("status")}
                </TableCell>
                <TableCell align="left">Online</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("code")}
                </TableCell>
                <TableCell align="left">Đã thanh toán</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width="30%">
                  {t("reason")}
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
                  {t("note")}
                </TableCell>
                <TableCell align="left">{reason}</TableCell>
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
                  Ghi chú của bác sĩ
                </TableCell>
                <TableCell align="left">{note}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default BookingDetail;
