import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from "@mui/material";
import formatDate from "date-and-time";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomModal from "../../../components/CustomModal";

function BookingModal({ show, setShow, data, setData }) {
  const [isSelf, setIsSelf] = useState(true);
  const { control, handleSubmit, trigger } = useForm({
    defaultValues: {
      reason: "",
      name: "",
      phone: "",
      gender: "",
      dob: new Date()
    }
  });

  const handleBooking = () => {};

  const { t } = useTranslation("bookingFeature", { keyPrefix: "BookingModal" });
  const { t: tBooking } = useTranslation("bookingEntity", { keyPrefix: "properties" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });

  const genders = useMemo(
    () => [
      {
        label: t("info.male"),
        value: "male"
      },
      {
        label: t("info.female"),
        value: "female"
      }
    ],
    []
  );

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      data={data}
      setData={setData}
      title={t("title")}
      submitBtnLabel={t("button.book")}
      onSubmit={handleSubmit(handleBooking)}
    >
      <Box
        sx={{
          width: "100%",
          px: 2
        }}
      >
        <Box mb={2} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography fontWeight={600} mr={2}>
            {tBooking("date")}:
          </Typography>
          <Typography fontWeight={500} textAlign="center">
            {formatDate.format(new Date(data?.date), "ddd, DD/MM/YYYY")} {`(${data?.schedule?.type})`}
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

        <FormControl>
          <FormLabel>{t("form.bookingFor")}:</FormLabel>
          <RadioGroup row defaultValue="self">
            <FormControlLabel value="self" control={<Radio onClick={() => setIsSelf(true)} />} label={t("form.self")} />
            <FormControlLabel
              value="patient"
              control={<Radio onClick={() => setIsSelf(false)} />}
              label={t("form.patient")}
            />
          </RadioGroup>
        </FormControl>

        {!isSelf && (
          <>
            <Typography fontWeight={600} mr={2}>
              {t("info.title")}:
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={12}>
                <CustomInput control={control} rules={{}} label={t("info.name")} trigger={trigger} name="name" type="text" />
              </Grid>
              <Grid item lg={6} md={12}>
                <CustomInput
                  control={control}
                  rules={{}}
                  label={t("info.phone")}
                  trigger={trigger}
                  name="phone"
                  type="tel"
                />
              </Grid>
              <Grid item lg={6} md={12}>
                <CustomInput control={control} rules={{}} label={t("info.gender")} trigger={trigger} name="gender">
                  <Select>
                    {genders.map((item) => {
                      return (
                        <MenuItem key={item?.value} value={item?.value}>
                          <ListItemText primary={item?.label} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </CustomInput>
              </Grid>
              <Grid item lg={6} md={12}>
                <CustomInput
                  control={control}
                  rules={{}}
                  label={t("info.birthday")}
                  trigger={trigger}
                  name="dob"
                  type="date"
                />
              </Grid>
            </Grid>
          </>
        )}

        <Typography mb={1} fontWeight={600}>
          {tBooking("reason")}:
        </Typography>
        <Controller
          control={control}
          rules={{ require: tInputValidate("required") }}
          name="reason"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              fullWidth
              rows={4}
              helperText={error?.message}
            />
          )}
        />
      </Box>
    </CustomModal>
  );
}

BookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired
};

export default BookingModal;
