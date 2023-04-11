import { Avatar, Box, Grid, Typography } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import doctorServices from "../../services/doctorServices";

import { useFetchingStore } from "../../store/FetchingApiStore";

import ExpertiseButton from "./components/ExpertiseButton";
import ScheduleTable from "./components/ScheduleTable";

function DoctorDetail() {
  const [doctor, setDoctor] = useState();

  const params = useParams();
  const doctorId = useMemo(() => params?.doctorId, [params?.doctorId]);

  const { fetchApi } = useFetchingStore();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "DoctorDetail" });

  useEffect(() => {
    const loadData = async () => {
      await fetchApi(async () => {
        const res = await doctorServices.getDoctorDetail(doctorId);

        if (res.success) {
          const doctorData = res.doctor;
          setDoctor(doctorData);

          return { success: true };
        }
        setDoctor({});
        return { error: res.message };
      });
    };
    loadData();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5" mb={2} fontWeight={600}>
        {t("title")}
      </Typography>

      <Grid container>
        <Grid
          item
          lg={12}
          // sx={{
          //   display: "flex",
          //   justifyContent: "center"
          // }}
        >
          <Box
            sx={{
              height: "100%",
              maxWidth: 800,
              display: "flex",
              flexDirection: "column",

              p: 0,
              cursor: "pointer",
              border: "none",
              mb: 8
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Avatar alt={doctor?.name} src={doctor?.image} sx={{ width: 200, height: 200 }} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  ml: 4
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: "500"
                  }}
                >
                  <Typography variant="h6">{doctor?.certificate}</Typography>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {doctor?.name}
                  </Typography>
                </Box>
                <Box>
                  {doctor?.idExpertiseExpertises?.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "600"
                        }}
                      >
                        {t("expertise")}
                      </Typography>
                      <Box>
                        {doctor?.idExpertiseExpertises?.map((expertise) => (
                          <ExpertiseButton key={expertise?.id} label={expertise?.name} />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600"
                    }}
                  >
                    {t("description")}
                  </Typography>
                  <Typography>{doctor?.description}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "600"
                    }}
                  >
                    {t("education")}
                  </Typography>
                  <Typography> {doctor?.education}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={12}>
          <ScheduleTable />
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorDetail;
