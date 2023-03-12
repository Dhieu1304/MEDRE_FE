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
  Button
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

function Header({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const { mode, setMode, locale, setLocale } = useAppConfigStore();

  const { t, i18n } = useTranslation("layout", { keyPrefix: "header" });

  // console.log({
  //   t,
  //   i18n
  // });

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, mr: "auto" }}>
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
              component="a"
              href=""
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

            {authStore.isLogin ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={authStore.user?.name} src={authStore.user?.image} />
                    <Typography
                      variant="caption"
                      noWrap
                      component="span"
                      href=""
                      sx={{
                        ml: 1,
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
                  <MenuItem
                    onClick={() => {
                      setMode((prev) => {
                        return prev === LIGHT ? DARK : LIGHT;
                      });
                    }}
                  >
                    <Typography textAlign="center">{mode}</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      const newLocale = locale === "viVN" ? "enUS" : "viVN";
                      const code = newLocale.slice(0, 2);
                      setLocale(newLocale);
                      i18n.changeLanguage(code);
                    }}
                  >
                    <Typography textAlign="center">{locale}</Typography>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <Typography textAlign="center">{t("logout_label")}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                {headerRightItems.map((item) => (
                  <Button
                    key={item.label}
                    LinkComponent={Link}
                    to={item.to}
                    variant="contained"
                    sx={{ mr: 1, my: 2, px: 2, display: "block", textDecoration: "none", borderRadius: 10 }}
                  >
                    {t(item.label)}
                  </Button>
                ))}
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
            display: { xs: "block", sm: "none" },
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
