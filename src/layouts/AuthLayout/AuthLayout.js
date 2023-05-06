import PropTypes from "prop-types";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper, Box, Grid, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import images from "../../assets/images";

import routeConfig from "../../config/routeConfig";

function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          overflow: "scroll"
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 14,
            overflow: "scroll"
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 2,
              cursor: "pointer"
            }}
            onClick={() => {
              navigate(routeConfig.home);
            }}
          >
            <Box
              component="img"
              sx={{
                mr: 1
              }}
              src={images.logo}
              width={40}
            />
            <Typography component="h1" variant="h3">
              Medre
            </Typography>
          </Box>

          {children}
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${images.authCover})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </Grid>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthLayout;
