import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import qs from "query-string";
import { useTranslation } from "react-i18next";
import doctorServices from "../../../services/doctorServices";
import DoctorCard from "./DoctorCard";

import { useFetchingStore } from "../../../store/FetchingApiStore";
import CustomOverlay from "../../../components/CustomOverlay";
import NoDataBox from "../../../components/NoDataBox";
import CustomInput from "../../../components/CustomInput";
import {
  normalizeStrToArray,
  normalizeStrToDateStr,
  normalizeStrToInt,
  normalizeStrToStr
} from "../../../utils/standardizedForForm";
import useObjDebounce from "../../../hooks/useObjDebounce";

function DoctorList() {
  const [expertisesList, setExpertisesList] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState();

  const location = useLocation();

  const { t } = useTranslation("doctorFeature", { keyPrefix: "DoctorList" });

  const { t: tfilter } = useTranslation("doctorFeature", { keyPrefix: "DoctorList.filter" });
  const { t: tSelectType } = useTranslation("doctorFeature", { keyPrefix: "DoctorList.select.types" });

  const [isFetchConfigSuccess, setIsFetchConfigSuccess] = useState(false);

  const { isLoading, fetchApi } = useFetchingStore();

  const doctorTypesList = useMemo(() => {
    return [
      {
        label: "online",
        value: "Online"
      },
      {
        label: "offline",
        value: "Offline"
      },
      {
        label: "all",
        value: ""
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

  const createDefaultValues = ({ search, type, date, expertises, page, limit } = {}) => {
    return {
      search: normalizeStrToStr(search),
      type: normalizeStrToStr(type),
      date: normalizeStrToDateStr(date, new Date()),
      expertises: normalizeStrToArray(expertises),
      page: normalizeStrToInt(page, 1),
      limit: normalizeStrToInt(limit, 10)
    };
  };

  const defaultValues = useMemo(() => {
    const defaultSearchParams = qs.parse(location.search);
    const result = createDefaultValues(defaultSearchParams);
    return result;
  }, []);

  const { control, trigger, watch, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const { debouncedObj: searchDebounce, isWaiting: isSearchWaiting } = useObjDebounce({ search: watch().search }, 1000);

  const navigate = useNavigate();

  const loadData = async ({ page }) => {
    const paramsObj = {
      ...watch(),
      from: watch().date,
      to: watch().date,
      name: watch().search,
      expertise: watch().expertises,
      page
    };

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

  const getWatchedValues = () => {
    const returnValues = Object.keys(watch()).reduce((values, key) => {
      if (key !== "search" && key !== "page") {
        values.push(watch()[key]);
      }
      return values;
    }, []);

    return returnValues;
  };

  useEffect(() => {
    const page = 1;
    const params = { ...watch(), page };

    const searchParams = qs.stringify(params);
    setValue("page", page);
    navigate(`?${searchParams}`);
    loadData({ page });
  }, [...getWatchedValues(), ...Object.values(searchDebounce)]);

  return (
    isFetchConfigSuccess && (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CustomOverlay open={isLoading} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 4
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontWeight={600}
            sx={{
              mr: 2
            }}
          >
            {t("title")}
          </Typography>
          {isSearchWaiting && <CircularProgress color="primary" size={24} thickness={3} />}
        </Box>

        <Box
          sx={{
            mb: 2
          }}
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <CustomInput control={control} label={tfilter("date")} trigger={trigger} name="date" type="date" />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <CustomInput control={control} label={tfilter("search")} trigger={trigger} name="search" type="text" />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <CustomInput control={control} label={tfilter("expertises")} trigger={trigger} name="expertises">
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
                        <Checkbox checked={watch().expertises?.indexOf(item?.id) > -1} />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CustomInput>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <CustomInput control={control} label={tfilter("type")} trigger={trigger} name="type">
                <Select
                  // multiple
                  renderValue={(selected) => {
                    return selected;
                  }}
                >
                  {doctorTypesList.map((item) => {
                    return (
                      <MenuItem key={item?.value} value={item?.value}>
                        <Checkbox checked={watch().type === item?.value} />
                        <ListItemText primary={tSelectType(item?.label)} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </CustomInput>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 4
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              reset(createDefaultValues());
            }}
          >
            {tfilter("button.reset")}
          </Button>
        </Box>

        {count > 0 ? (
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            {t("subTitle.list")}
          </Typography>
        ) : (
          <NoDataBox />
        )}

        <Grid container spacing={4} px={0} py={4}>
          {doctors.map((doctor) => (
            <Grid item key={doctor?.id} xs={12} sm={12} md={6} lg={4} p={0}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>

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
                const params = { ...watch(), page: newPage };
                const searchParams = qs.stringify(params);
                navigate(`?${searchParams}`);
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
