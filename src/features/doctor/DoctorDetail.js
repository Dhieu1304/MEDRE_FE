import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

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

  const { t } = useTranslation("doctorFeature", { keyPrefix: "doctor_detail" });

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
        <Grid item lg={12}>
          <Card
            sx={{
              height: "100%",
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              p: 0,
              cursor: "pointer",
              border: "none"
            }}
          >
            <CardHeader
              avatar={<Avatar alt={doctor?.name} src={doctor?.image} />}
              title={<Typography variant="h6">{doctor?.name}</Typography>}
              subheader={doctor?.certificate && `(${doctor?.certificate})`}
            />
            <CardContent sx={{ flexGrow: 1, pt: 0 }}>
              <Box>
                <Typography>{doctor?.description}</Typography>
              </Box>
              <Box>
                {doctor?.idExpertiseExpertises?.length > 0 && (
                  <Box>
                    <Typography>{t("expertise")}</Typography>
                    <Box>
                      {doctor?.idExpertiseExpertises?.map((expertise) => (
                        <ExpertiseButton key={expertise?.id} label={expertise?.name} />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
              <Box>
                {doctor?.education && (
                  <Typography>
                    {t("education")}: {doctor?.education}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12}>
          <ScheduleTable />
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorDetail;
