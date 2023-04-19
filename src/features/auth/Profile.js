import { Box, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation("profilePage");
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("title.login")}
          </Typography>
          <TextField required id="email" label={t("subtitle.email")} defaultValue="dh1304@gmail.com" />
          <TextField required id="username" label={t("subtitle.username")} defaultValue="dh1304" />
          <TextField required id="phone" label={t("subtitle.phone")} defaultValue="0962143156" />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("title.auth")}
          </Typography>
          <TextField
            id="outlined-read-only-input"
            label={t("subtitle.author")}
            defaultValue="User"
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-read-only-input2"
            label={t("subtitle.status")}
            defaultValue="OK"
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("title.information")}
          </Typography>
          <div>
            <TextField required id="Fullname" label={t("subtitle.fullname")} defaultValue="Nguyễn Đình Hiệu" />
            <TextField required id="DOB" label={t("subtitle.dob")} defaultValue="13/04/2001" />
            <TextField required id="Gender" label={t("subtitle.gender")} defaultValue="Nam" />
          </div>
          <TextField id="outlined-multiline-static" label={t("subtitle.address")} multiline rows={4} defaultValue="" />
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
