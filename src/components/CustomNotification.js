import PropTypes from "prop-types";
import React, { useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Box, Typography, Button } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function CustomNotification({ notifications }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation("components", { keyPrefix: "CustomNotification" });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleClick} size="large" sx={{ mr: 2 }}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Typography variant="h4" textAlign="center" fontSize={20} fontWeight={600} sx={{ py: 1 }}>
          {t("title")}
        </Typography>
        <Box
          sx={{
            maxHeight: 400,
            overflowY: "scroll",
            overflowX: "hidden",
            // border: "1px solid rgba(0,0,0)",
            m: 0,
            width: 350
          }}
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification?.id}
              onClick={handleClose}
              sx={{
                position: "relative"
              }}
            >
              <Box>
                <Typography variant="h5" fontSize={16} fontWeight={600}>
                  {notification?.notificationsParent?.title?.slice(0, 50)}
                  {notification?.notificationsParent?.title?.length > 50 && "..."}
                </Typography>
                <Box component="p" fontSize={12}>
                  {notification?.notificationsParent?.content?.slice(0, 50)}
                  {notification?.notificationsParent?.content?.length > 50 && "..."}
                </Box>
                {!notification?.read && ( // Kiểm tra read là false
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 10
                    }}
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button variant="text">{t("button.seeMore")}</Button>
        </Box>
      </Menu>
    </Box>
  );
}

CustomNotification.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default CustomNotification;
