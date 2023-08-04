import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Switch,
  useMediaQuery
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  headerRightItems,
  headerDropdownMenu,
  drawerWidth,
  headerLeftItemsLogined,
  headerLeftItemsNotLogin
} from "./config";

import images from "../../../assets/images";
import { useAuthStore } from "../../../store/AuthStore/hooks";
import { useAppConfigStore } from "../../../store/AppConfigStore";
import { DARK, LIGHT } from "../../../config/themeConfig";
import routeConfig from "../../../config/routeConfig";
import CustomNotification from "../../../components/CustomNotification";

function Header({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const { mode, setMode, locale, setLocale, notifications, unreadNotificationCount } = useAppConfigStore();

  const { t, i18n } = useTranslation("layout", { keyPrefix: "header" });

  const isMobile = useMediaQuery("(max-width: 600px)");

  const authStore = useAuthStore();

  const navigate = useNavigate();

  const headerLeftItems = useMemo(() => {
    if (authStore.isLogin) return [...headerLeftItemsLogined];
    return [...headerLeftItemsNotLogin];
  }, [authStore.isLogin]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = async () => {
    await authStore.logout();
  };

  const handleChangeLanguage = () => {
    const newLocale = locale === "viVN" ? "enUS" : "viVN";
    const code = newLocale?.slice(0, 2);
    setLocale(newLocale);
    i18n.changeLanguage(code);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ my: 2, mr: "auto" }}>
        Medre
      </Typography>
      <Divider />
      <List>
        {headerLeftItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Box
                  key={item.label}
                  component={Link}
                  to={item.to}
                  sx={{ my: 0, px: 2, display: "block", textDecoration: "none", color: "inherit" }}
                >
                  {t(item.label)}
                </Box>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar component="nav" position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              sx={{
                mr: 1
              }}
              src={images.logo}
              width={20}
            />

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={routeConfig.home}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              MEDRE
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={routeConfig.home}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              MEDRE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {headerLeftItems.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  to={item.to}
                  sx={{ my: 2, px: 2, display: "block", textDecoration: "none", color: "inherit" }}
                >
                  {t(item.label)}
                </Box>
              ))}
            </Box>

            <Box
              component={Avatar}
              src={locale === "enUS" ? images.vietnamese : images.english}
              sx={{
                cursor: "pointer",
                width: 25,
                height: 25,
                mr: 2
              }}
              onClick={handleChangeLanguage}
            />

            {authStore.isLogin ? (
              <>
                <CustomNotification notifications={notifications} unreadNotificationCount={unreadNotificationCount} />
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={authStore.user?.name} src={authStore.user?.image} sx={{ mr: 1 }} />
                      <Typography
                        variant="caption"
                        noWrap
                        component="span"
                        href=""
                        sx={{
                          display: { xs: "none", md: "flex" },
                          fontWeight: 700,
                          color: "inherit",
                          textDecoration: "none"
                        }}
                      >
                        {authStore.user?.name}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {headerDropdownMenu.map((item) => (
                      <MenuItem
                        key={item.label}
                        onClick={() => {
                          navigate(item.to);
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">{t(item.label)}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Typography>{t("dark_mode_label")} </Typography>
                        <Switch
                          checked={mode === DARK}
                          onClick={() => {
                            setMode((prev) => {
                              return prev === LIGHT ? DARK : LIGHT;
                            });
                          }}
                        />
                      </Box>
                    </MenuItem>

                    <MenuItem>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Typography>{t("english_language_label")} </Typography>
                        <Switch checked={locale === "enUS"} onClick={handleChangeLanguage} />
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                      <Typography textAlign="center">{t("logout_label")}</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                {headerRightItems.map((item) =>
                  isMobile ? (
                    <Box
                      key={item.label}
                      component={Link}
                      to={item.to}
                      sx={{
                        mr: 1,
                        textDecoration: "none",
                        borderRadius: 10,
                        color: "inherit"
                      }}
                    >
                      {t(item.label)}
                    </Box>
                  ) : (
                    <Button
                      key={item.label}
                      LinkComponent={Link}
                      to={item.to}
                      variant="contained"
                      sx={{
                        mr: 1,
                        my: 2,
                        px: 2,
                        textDecoration: "none",
                        borderRadius: 10
                      }}
                    >
                      {t(item.label)}
                    </Button>
                  )
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { md: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Header.defaultProps = {
  window: undefined
};

Header.propTypes = {
  window: PropTypes.func || undefined
};

export default Header;
