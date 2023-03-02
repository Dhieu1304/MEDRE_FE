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
import CustomInput from "./CustomInput";
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

  const genders = useMemo(
    () => [
      {
        label: "Male",
        value: "male"
      },
      {
        label: "Female",
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
      title="Booking details"
      submitBtnLabel="Book"
      onSubmit={handleSubmit(handleBooking)}
    >
      <Box>
        <Box mb={2} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography fontWeight={600} mr={2}>
            Date:
          </Typography>
          <Typography fontWeight={500} textAlign="center">
            {formatDate.format(new Date(data?.date), "ddd, MMM DD YYYY")} {`(${data?.type})`}
          </Typography>
        </Box>
        <Box mb={2} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography fontWeight={600} mr={2}>
            Time:
          </Typography>
          <Typography fontWeight={500} textAlign="center">
            {data?.time}
          </Typography>
        </Box>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row defaultValue="self">
            <FormControlLabel value="self" control={<Radio onClick={() => setIsSelf(true)} />} label="Self" />
            <FormControlLabel value="other" control={<Radio onClick={() => setIsSelf(false)} />} label="Other" />
          </RadioGroup>
        </FormControl>

        {!isSelf && (
          <>
            <Typography fontWeight={600} mr={2}>
              Infor:
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={12}>
                <CustomInput control={control} rules={{}} label="Name" trigger={trigger} name="name" type="text" />
              </Grid>
              <Grid item lg={6} md={12}>
                <CustomInput control={control} rules={{}} label="Phone" trigger={trigger} name="phone" type="tel" />
              </Grid>
              <Grid item lg={6} md={12}>
                <CustomInput control={control} rules={{}} label="Gender" trigger={trigger} name="gender">
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
                <CustomInput control={control} rules={{}} label="Birthday" trigger={trigger} name="dob" type="date" />
              </Grid>
            </Grid>
          </>
        )}

        <Typography mb={1} fontWeight={600}>
          Reason:
        </Typography>
        <Controller
          control={control}
          rules={{ require: "This field is required" }}
          name="reason"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Your reasons"
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
