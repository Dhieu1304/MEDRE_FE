import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  Avatar,
  Card,
  CardHeader,
  Select,
  MenuItem,
  ListItemText,
  InputAdornment,
  TextField,
  useTheme
} from "@mui/material";
function Profile() {
  const { t } = useTranslation("profilePage");
  return (
    <div>
      {/* <Box
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
      </Box> */}
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 4,
          px: {
            xl: 8,
            lg: 6,
            md: 0
          },
          pt: 5,
          pb: 10,
          position: "relative"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card
            sx={{
              boxShadow: "none"
            }}
          >
            <CardHeader
              avatar={<Avatar sx={{ width: 150, height: 150, cursor: "pointer" }} alt="" src="" />}
              title=""
              subheader=""
            />
          </Card>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("title.account")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField required id="email" label={t("subtitle.email")} defaultValue="dh1304@gmail.com" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField required id="username" label={t("subtitle.username")} defaultValue="dh1304" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField required id="phone" label={t("subtitle.phone")} defaultValue="0962143156" />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {t("title.personality")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                id="outlined-read-only-input"
                label={t("subtitle.author")}
                defaultValue="User"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                id="outlined-read-only-input2"
                label={t("subtitle.status")}
                defaultValue="OK"
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField required id="DOB" label={t("subtitle.dob")} defaultValue="13/04/2001" />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField required id="Gender" label={t("subtitle.gender")} defaultValue="Nam" />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField id="outlined-multiline-static" label={t("subtitle.address")} multiline rows={4} defaultValue="" />
            </Grid>
          </Grid>
        </Box>

        {/* {canUpdateUser && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                reset(defaultValues);
              }}
              sx={{
                ml: 2,
                bgcolor: theme.palette.warning.light
              }}
              startIcon={<RestartAltIcon color={theme.palette.warning.contrastText} />}
            >
              {tBtn("reset")}
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit(handleSaveDetail)}
              sx={{
                ml: 2,
                bgcolor: theme.palette.success.light
              }}
              startIcon={<SaveIcon color={theme.palette.success.contrastText} />}
            >
              {tBtn("save")}
            </Button>
          </Box>
            )} */}
      </Box>

      {/* {blockUserModal.show && (
        <BlockUserModal
          show={blockUserModal.show}
          setShow={blockUserModal.setShow}
          data={blockUserModal.data}
          setData={blockUserModal.setData}
          handleAfterBlockUser={handleAfterBlockUser}
        />
      )}

      {unblockUserModal.show && (
        <UnblockUserModal
          show={unblockUserModal.show}
          setShow={unblockUserModal.setShow}
          data={unblockUserModal.data}
          setData={unblockUserModal.setData}
          handleAfterUnblockUser={handleAfterUnblockUser}
        />
      )}

      {notHaveAccessModal.show && (
        <NotHaveAccessModal
          show={notHaveAccessModal.show}
          setShow={notHaveAccessModal.setShow}
          data={notHaveAccessModal.data}
          setData={notHaveAccessModal.setData}
        />
      )} */}
    </div>
  );
}

export default Profile;
