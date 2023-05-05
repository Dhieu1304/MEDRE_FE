import { Avatar, Box, Typography } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import doctorServices from "../../../services/doctorServices";

import { useFetchingStore } from "../../../store/FetchingApiStore";

import ExpertiseButton from "../components/ExpertiseButton";
import DoctorScheduleTable from "./DoctorScheduleTable";
import CustomOverlay from "../../../components/CustomOverlay/CustomOverlay";

function DoctorDetail() {
  const [doctor, setDoctor] = useState();

  const params = useParams();
  const doctorId = useMemo(() => params?.doctorId, [params?.doctorId]);

  const { isLoading, fetchApi } = useFetchingStore();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "DoctorDetail" });
  const { t: tDoctor } = useTranslation("doctorEntity", { keyPrefix: "properties" });

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
      <CustomOverlay open={isLoading} />
      <Typography
        component="h1"
        variant="h4"
        fontWeight={600}
        fontSize={{
          sm: 30,
          xs: 25
        }}
        sx={{
          mb: 4
        }}
      >
        {t("title")}
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column"
            },
            justifyContent: "flex-start",
            alignItems: {
              sm: "flex-start",
              xs: "center"
            },
            mb: 4
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
              ml: {
                sm: 4,
                xs: 0
              },
              flexGrow: 1
            }}
          >
            <Typography variant="h6">{doctor?.name}</Typography>
            <Typography variant="body2">({doctor?.certificate})</Typography>

            <Box>
              {doctor?.expertises?.length > 0 && (
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
                    {tDoctor("expertises")}
                  </Typography>
                  <Box
                    sx={
                      {
                        // ml: 2
                      }
                    }
                  >
                    {doctor?.expertises?.map((expertise) => (
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
                {tDoctor("description")}
              </Typography>
              <Typography
                sx={
                  {
                    // ml: 2
                  }
                }
              >
                {doctor?.description}
              </Typography>
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
                {tDoctor("education")}
              </Typography>
              <Typography
                sx={
                  {
                    // ml: 2
                  }
                }
              >
                {doctor?.education}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <DoctorScheduleTable doctorId={doctorId} />
        </Box>
      </Box>
    </>
  );
}

export default DoctorDetail;
