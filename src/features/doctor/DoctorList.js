import { Box, Checkbox, Grid, ListItemText, MenuItem, Pagination, Select } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import doctorServices from "../../services/doctorServices";
import DoctorCard from "./components/DoctorCard";
import CustomInput from "./components/CustomInput";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const { control, trigger, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      types: [],
      degrees: [],
      specialties: []
    },
    criteriaMode: "all"
  });

  const doctorTypes = useMemo(
    () => [
      {
        label: "Online",
        value: "online"
      },
      {
        label: "Offline",
        value: "offline"
      }
    ],
    []
  );

  const doctorDegrees = useMemo(
    () => [
      {
        label: "Giáo sư",
        value: "professor"
      },
      {
        label: "Tiến sĩ",
        value: "doctor"
      }
    ],
    []
  );

  const specialties = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const loadData = async () => {
      const res = await doctorServices.getDoctorList();
      const doctorsData = res.doctors;
      setDoctors(doctorsData);
    };
    loadData();
  }, []);

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
                  return selected.join(", ");
                }}
              >
                {doctorTypes.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <Checkbox checked={watch("types").indexOf(item?.value) > -1} />
                      <ListItemText primary={item?.label} />
                    </MenuItem>
                  );
                })}
              </Select>
            </CustomInput>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Degrees" trigger={trigger} name="degrees">
              <Select
                multiple
                renderValue={(selected) => {
                  return selected.join(", ");
                }}
              >
                {doctorDegrees.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <Checkbox checked={watch("degrees").indexOf(item?.value) > -1} />
                      <ListItemText primary={item?.label} />
                    </MenuItem>
                  );
                })}
              </Select>
            </CustomInput>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomInput control={control} rules={{}} label="Khoa" trigger={trigger} name="specialties">
              <Select
                multiple
                renderValue={(selected) => {
                  return selected.join(", ");
                }}
              >
                {specialties.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <Checkbox checked={watch("specialties").indexOf(item?.value) > -1} />
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
      <Pagination
        count={10}
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "end",
          py: 2
        }}
      />
    </Box>
  );
}

export default DoctorList;
