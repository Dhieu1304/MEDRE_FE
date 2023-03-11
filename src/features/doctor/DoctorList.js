import { Box, Checkbox, Grid, ListItemText, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import formatDate from "date-and-time";
import { useLocation } from "react-router";
import qs from "query-string";
import doctorServices from "../../services/doctorServices";
import DoctorCard from "./components/DoctorCard";
import CustomInput from "./components/CustomInput";
import useSearchFilter from "../../hooks/useSearchFilter";

const doctorTypes = [
  {
    label: "Online",
    value: "online"
  },
  {
    label: "Offline",
    value: "offline"
  }
];

const specialtiesList = [
  {
    label: "Tâm lý",
    value: "psychology"
  },
  {
    label: "Răng hàm mặt",
    value: "maxillofacial"
  },
  {
    label: "Khoa tai mũi họng",
    value: "otorhinolaryngology"
  }
];

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const location = useLocation();

  const defaultValues = useMemo(() => {
    const defaultSearchParams = qs.parse(location.search);
    const { search, types, date, specialties } = defaultSearchParams;
    return {
      search: search || "",
      types: Array.isArray(types) ? types : [],
      date: date || formatDate.format(new Date(), "YYYY-MM-DD"),
      specialties: Array.isArray(specialties) ? specialties : []
    };
  }, []);

  const { control, trigger, watch, reset } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const loadData = async () => {
    const res = await doctorServices.getDoctorList();
    const doctorsData = res.doctors;
    setDoctors(doctorsData);
  };

  useSearchFilter({ location, watch, useWatch, control, loadData, reset });

  return (
    <Box>
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Search by name" trigger={trigger} name="search" type="text" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Types" trigger={trigger} name="types">
              <Select
                multiple
                renderValue={(selected) => {
                  if (Array.isArray(selected)) return selected?.join(", ");
                  return selected;
                }}
              >
                {doctorTypes.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <Checkbox checked={watch("types")?.indexOf(item?.value) > -1} />
                      <ListItemText primary={item?.label} />
                    </MenuItem>
                  );
                })}
              </Select>
            </CustomInput>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Date" trigger={trigger} name="date" type="date" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Khoa" trigger={trigger} name="specialties">
              <Select
                multiple
                renderValue={(selected) => {
                  if (Array.isArray(selected)) return selected?.join(", ");
                  return selected;
                }}
              >
                {specialtiesList.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <Checkbox checked={watch("specialties")?.indexOf(item?.value) > -1} />
                      <ListItemText primary={item?.label} />
                    </MenuItem>
                  );
                })}
              </Select>
            </CustomInput>
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
    </Box>
  );
}

export default DoctorList;
