import React from "react";
import { Button, Stack, Typography, Box, useTheme } from "@mui/material";
import { BookOnline, LocalHospital, History, CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import images from "../../assets/images";
import routeConfig from "../../config/routeConfig";

const titleSx = {
  fontSize: 20,
  fontWeight: 600,
  height: "max-content",
  alignSelf: "center",
  justifySelf: "center",
  my: "1rem"
};

function HomePage() {
  const navigate = useNavigate();

  const { t } = useTranslation("homePage");

  const subTitles = [
    {
      title: t("subTitle.subTitle1"),
      img: images.medreIntro,
      flexDirection: "row"
    },
    {
      title: t("subTitle.subTitle2"),
      img: images.medreIntro,
      flexDirection: "row-reverse"
    },
    {
      title: t("subTitle.subTitle3"),
      img: images.medreIntro,
      flexDirection: "row"
    }
  ];

  const functionMenu = [
    {
      title: t("menu.online"),
      icon: <BookOnline fontSize="large" />,
      to: routeConfig.doctor
    },
    {
      title: t("menu.offline"),
      icon: <LocalHospital fontSize="large" />,
      to: routeConfig.doctor
    },
    {
      title: t("menu.history"),
      icon: <History fontSize="large" />,
      to: routeConfig.history
    },
    {
      title: t("menu.schedule"),
      icon: <CalendarMonth fontSize="large" />,
      to: routeConfig.schedule
    }
  ];

  const theme = useTheme();
  // const [bgColor, color] = useMemo(() => {

  //   const backgroundColor = theme.palette.

  // }, [mode])

  const backgroundColor = theme.palette.background.paper;

  return (
    <Box sx={{ backgroundColor, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column", backgroundColor, height: "550px" }}>
        <Typography sx={titleSx}>{t("title1")}</Typography>
        <Box component="img" src={images.medreIntro} sx={{ flexShrink: 1, width: "100%", height: "90%" }} alt="" />
      </Box>
      <Box sx={{ backgroundColor, display: "flex", flexDirection: "column", height: "max-content" }}>
        <Typography sx={titleSx}>{t("title2")}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
          {functionMenu.map((item) => {
            return (
              <Button
                key={item.title}
                variant="outlined"
                sx={{ width: "10rem", height: "10rem", p: 1, m: 2, fontSize: "1.5rem" }}
                onClick={() => {
                  navigate(item.to);
                }}
              >
                <Stack direction="column" alignItems="center" justifyContent="center">
                  {item.icon}
                  <Typography sx={{ fontSize: "1.2rem", mt: 2 }}>{item.title}</Typography>
                </Stack>
              </Button>
            );
          })}
        </Box>
      </Box>
      {subTitles.map((item) => {
        return (
          <Box
            key={item.title}
            sx={{
              backgroundColor,
              display: "flex",
              flexDirection: item.flexDirection,
              height: "max-content",
              mb: 4
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: 16,
                height: "max-content",
                alignSelf: "center",
                justifySelf: "center",
                my: "1rem",
                mx: 4
              }}
            >
              {item.title}
            </Typography>
            <Box component="img" src={item.img} sx={{ width: "80%", height: "100%" }} alt="" />
          </Box>
        );
      })}
    </Box>
  );
}

export default HomePage;
