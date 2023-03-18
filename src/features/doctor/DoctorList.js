import { Box, Checkbox, Grid, ListItemText, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import qs from "query-string";
import { useTranslation } from "react-i18next";
import doctorServices from "../../services/doctorServices";
import DoctorCard from "./components/DoctorCard";
import CustomInput from "./components/CustomInput";
import { useFetchingStore } from "../../store/FetchingApiStore";
import CustomOverlay from "../../components/CustomOverlay";
import NoDataBox from "../components/NoDataBox";

function DoctorList() {
  const [expertisesList, setExpertisesList] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState();

  const location = useLocation();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "doctor_list" });

  const [isFetchConfigSuccess, setIsFetchConfigSuccess] = useState(false);

  const { isLoading, fetchApi } = useFetchingStore();

  const doctorTypesList = useMemo(() => {
    return [
      {
        label: "Online",
        value: "Online"
      },
      {
        label: "Offline",
        value: "Offline"
      }
    ];
  }, []);

  const expertiseListObj = useMemo(() => {
    return expertisesList.reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.id]: cur
      };
    }, {});
  }, [expertisesList]);

  const defaultValues = useMemo(() => {
    const defaultSearchParams = qs.parse(location.search);

    const { search, type, date, expertise, page, limit } = defaultSearchParams;

    return {
      search: search || "",
      type: Array.isArray(type) ? type : [],
      // date: date || formatDate.format(new Date(2023, 2, 12), "YYYY-MM-DD"),
      date,
      // from: from || formatDate.format(new Date(2023, 2, 12), "YYYY-MM-DD"),
      // to: formatDate.format(new Date(2023, 2, 14), "YYYY-MM-DD"),
      expertise: Array.isArray(expertise) ? expertise : [],
      page: parseInt(page, 10) || 1,
      limit: limit || 1
    };
  }, []);

  const { control, trigger, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const navigate = useNavigate();

  const loadData = async ({ page }) => {
    // console.log("Load: ");
    // const expertise = [];
    const paramsObj = {
      ...watch(),
      from: watch().date,
      to: watch().date,
      page
    };
    if (!paramsObj.from) {
      delete paramsObj.from;
    }
    if (!paramsObj.to) {
      delete paramsObj.to;
    }

    await fetchApi(async () => {
      const res = await doctorServices.getDoctorList(paramsObj);

      let countData = 0;
      let doctorsData = [];

      if (res.success) {
        doctorsData = res?.doctors || [];
        countData = res?.count;
        setDoctors(doctorsData);
        setCount(countData);

        return { success: true };
      }
      setDoctors([]);
      setCount(0);
      return { error: res.message };
    });
  };

  const loadConfig = async () => {
    await fetchApi(async () => {
      const res = await doctorServices.getDoctorExpertises();

      if (res.success) {
        const expertisesData = res?.expertises;
        setExpertisesList(expertisesData);
        setIsFetchConfigSuccess(true);
        return { success: true };
      }
      setExpertisesList([]);
      setIsFetchConfigSuccess(true);
      return { error: res.message };
    });
  };

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    const page = 1;
    const params = { ...watch(), page };

    const searchParams = qs.stringify(params);
    navigate(`?${searchParams}`);

    loadData({ page });
  }, [watch().expertise, watch().type, watch().date]);

  return (
    isFetchConfigSuccess && (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CustomOverlay open={isLoading} />
        <Typography component="h1" variant="h5" mb={2} fontWeight={600}>
          {t("title")}
        </Typography>
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomInput control={control} rules={{}} label={t("filter.expertise")} trigger={trigger} name="expertise">
                <Select
                  multiple
                  renderValue={(selected) => {
                    if (Array.isArray(selected))
                      return selected
                        ?.map((cur) => {
                          return expertiseListObj[cur]?.name;
                        })
                        ?.join(", ");
                    return selected;
                  }}
                >
                  {expertisesList.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        <Checkbox checked={watch().expertise?.indexOf(item?.id) > -1} />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CustomInput>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomInput
                control={control}
                rules={{}}
                label={t("filter.search")}
                trigger={trigger}
                name="search"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomInput control={control} rules={{}} label={t("filter.type")} trigger={trigger} name="type">
                <Select
                  multiple
                  renderValue={(selected) => {
                    if (Array.isArray(selected)) return selected?.join(", ");
                    return selected;
                  }}
                >
                  {doctorTypesList.map((item) => {
                    return (
                      <MenuItem key={item?.value} value={item?.value}>
                        {/* type không lấy theo ID nên để
                      checked={watch("type")?.indexOf(item?.value) > -1}   */}
                        <Checkbox checked={watch("type")?.indexOf(item?.value) > -1} />
                        <ListItemText primary={item?.label} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CustomInput>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomInput control={control} rules={{}} label={t("filter.date")} trigger={trigger} name="date" type="date" />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4} px={0} py={4}>
          {doctors.map((doctor) => (
            <Grid item key={doctor?.id} xs={12} sm={6} md={4} p={0}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>

        {count === 0 && <NoDataBox />}

        {!!count && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Pagination
              count={Math.ceil(count / watch().limit)}
              color="primary"
              page={watch().page}
              sx={{
                display: "flex",
                justifyContent: "flex-end"
              }}
              onChange={(event, newPage) => {
                setValue("page", newPage);
                loadData({ page: newPage });
              }}
            />
          </Box>
        )}
      </Box>
    )
  );
}

export default DoctorList;
