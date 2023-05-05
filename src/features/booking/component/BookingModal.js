import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
} from "@mui/material";
import formatDate from "date-and-time";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomModal from "../../../components/CustomModal";
import { useFetchingStore } from "../../../store/FetchingApiStore/hooks";
import bookingServices from "../../../services/bookingServices";
import { useAppConfigStore } from "../../../store/AppConfigStore/hooks";
import { patientGenders } from "../../../entities/Patient/constant";
import { scheduleTypes } from "../../../entities/Schedule";

function BookingModal({ show, setShow, data, setData, handleAfterBooking }) {
  const [isSelf, setIsSelf] = useState(true);
  const bookingForm = useForm({
    defaultValues: {
      scheduleId: data?.schedule?.id,
      timeId: data?.time?.id,
      date: data?.date,
      reason: "",
      patientId: ""
    }
  });

  const addPatientForm = useForm({
    defaultValues: {
      phoneNumber: "",
      name: "",
      gender: "",
      address: "",
      dob: "",
      healthInsurance: ""
    }
  });

  const { fetchApi } = useFetchingStore();
  const { locale } = useAppConfigStore();

  useEffect(() => {
    bookingForm.trigger();
  }, []);

  const handleBooking = async ({ scheduleId, timeId, date, reason, patientId }) => {
    await fetchApi(async () => {
      const res = await bookingServices.book({ scheduleId, timeId, date, reason, patientId });
      if (res?.success) {
        setShow(false);
        setData({});
        if (handleAfterBooking) await handleAfterBooking();
        return { success: true };
      }
      toast(res.message);
      return { error: res.message };
    });
  };

  // const handleAddPatient = async ({ phoneNumber, name, gender, address, dob, healthInsurance }) => {
  const handleAddPatient = async () => {
    // console.log("handleAddPatient: ", { phoneNumber, name, gender, address, dob, healthInsurance });
  };

  const handleBeforeBookingSubmit = () => {
    if (isSelf) {
      // console.log("Booking Self");
      return bookingForm.handleSubmit(handleBooking);
    }
    return bookingForm.handleSubmit(addPatientForm.handleSubmit(handleAddPatient));
  };

  const { t } = useTranslation("bookingFeature", { keyPrefix: "BookingModal" });
  const { t: tBooking } = useTranslation("bookingEntity", { keyPrefix: "properties" });
  const { t: tScheduleConstants } = useTranslation("scheduleEntity", { keyPrefix: "constants" });
  const { t: tPatient } = useTranslation("patientEntity", { keyPrefix: "properties" });
  const { t: tPatientConstants } = useTranslation("patientEntity", { keyPrefix: "constants" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  const scheduleTypeListObj = useMemo(() => {
    return [
      {
        label: tScheduleConstants("types.offline"),
        value: scheduleTypes.TYPE_OFFLINE
      },
      {
        label: tScheduleConstants("types.online"),
        value: scheduleTypes.TYPE_ONLINE
      }
    ].reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});
  }, [locale]);

  const genderListObj = useMemo(() => {
    return [
      {
        label: tPatientConstants("genders.male"),
        value: patientGenders.MALE
      },
      {
        label: tPatientConstants("genders.female"),
        value: patientGenders.FEMALE
      },
      {
        label: tPatientConstants("genders.other"),
        value: patientGenders.OTHER
      },
      {
        label: tPatientConstants("genders.none"),
        value: ""
      }
    ].reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});
  }, [locale]);

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      data={data}
      setData={setData}
      title={t("title")}
      submitBtnLabel={t("button.book")}
      onSubmit={handleBeforeBookingSubmit()}
    >
      <Box
        sx={{
          width: "100%",
          maxHeight: 500,
          overflow: "scroll",
          px: 2
        }}
      >
        <Box mb={2} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography fontWeight={600} mr={2}>
            {tBooking("date")}:
          </Typography>
          <Typography fontWeight={500} textAlign="center">
            {formatDate.format(new Date(data?.date), "ddd, DD/MM/YYYY")}{" "}
            {`(${scheduleTypeListObj?.[data?.schedule?.type]?.label})`}
          </Typography>
        </Box>
        <Box mb={2} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography fontWeight={600} mr={2}>
            {tBooking("time")}:
          </Typography>
          <Typography fontWeight={500} textAlign="center">
            {`${data?.time?.timeStart?.split(":")[0]}:${data?.time?.timeStart?.split(":")[1]}`} -{" "}
            {`${data?.time?.timeEnd?.split(":")[0]}:${data?.time?.timeEnd?.split(":")[1]}`}
          </Typography>
        </Box>

        <FormControl
          sx={{
            mb: 2
          }}
        >
          <FormLabel>{t("form.bookingFor")}:</FormLabel>
          <RadioGroup row defaultValue="self">
            <FormControlLabel value="self" control={<Radio onClick={() => setIsSelf(true)} />} label={t("form.self")} />
            <FormControlLabel value="other" control={<Radio onClick={() => setIsSelf(false)} />} label={t("form.other")} />
          </RadioGroup>
        </FormControl>

        {!isSelf && (
          <Box
            sx={{
              mb: 2
            }}
          >
            <Typography fontWeight={600} mb={2}>
              {t("subTitle.bookingForOther")}:
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{ required: tInputValidate("required") }}
                  label={tPatient("name")}
                  trigger={addPatientForm.trigger}
                  name="name"
                  type="text"
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{ required: tInputValidate("required") }}
                  label={tPatient("phoneNumber")}
                  trigger={addPatientForm.trigger}
                  name="phoneNumber"
                  type="tel"
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{}}
                  label={tPatient("gender")}
                  trigger={addPatientForm.trigger}
                  name="gender"
                >
                  <Select
                    renderValue={(selected) => {
                      return genderListObj[selected].label;
                    }}
                  >
                    {Object.keys(genderListObj).map((key) => {
                      const item = genderListObj[key];

                      return (
                        <MenuItem key={item?.value} value={item?.value}>
                          <Checkbox checked={addPatientForm.watch().gender === item?.value} />
                          <ListItemText primary={item?.label} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </CustomInput>
              </Grid>
              <Grid item lg={6} xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{ required: tInputValidate("required") }}
                  label={tPatient("dob")}
                  trigger={addPatientForm.trigger}
                  name="dob"
                  type="date"
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{}}
                  label={tPatient("healthInsurance")}
                  trigger={addPatientForm.trigger}
                  name="healthInsurance"
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  control={addPatientForm.control}
                  rules={{}}
                  label={tPatient("address")}
                  trigger={addPatientForm.trigger}
                  name="address"
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <CustomInput
          control={bookingForm.control}
          label={tBooking("reason")}
          rules={{ required: tInputValidate("required") }}
          name="reason"
          trigger={bookingForm.trigger}
          multiline
          fullWidth
          rows={4}
        />
      </Box>
    </CustomModal>
  );
}

BookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  handleAfterBooking: PropTypes.func.isRequired
};

export default BookingModal;
