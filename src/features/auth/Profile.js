import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  Avatar,
  Card,
  CardHeader,
  Select,
  MenuItem,
  ListItemText,
  useTheme
} from "@mui/material";
import { RestartAlt as RestartAltIcon, Save as SaveIcon } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import userServices from "../../services/userServices";
import { useAuthStore } from "../../store/AuthStore/hooks";
import CustomInput from "../../components/CustomInput/CustomInput";
import { userGenders, userInputValidate } from "../../entities/User/constant";
import { mergeObjectsWithoutNullAndUndefined } from "../../utils/objectUtil";
import { useFetchingStore } from "../../store/FetchingApiStore/hooks";

function Profile() {
  const [defaultValues, setDefaultValues] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    address: "",
    gender: "",
    dob: "",
    healthInsurance: ""
  });

  const { control, trigger, watch, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all"
  });

  const authStore = useAuthStore();
  const theme = useTheme();
  const { fetchApi } = useFetchingStore();

  const user = useMemo(() => {
    return { ...authStore.user };
  }, [authStore]);

  // console.log("user: ", user);

  const loadData = async () => {
    const userData = await authStore.loadUserInfo();

    // console.log("userData: ", userData);

    if (userData) {
      const newDefaultValues = {
        ...mergeObjectsWithoutNullAndUndefined(defaultValues, userData)
      };

      setDefaultValues(newDefaultValues);
      reset(newDefaultValues);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const { t } = useTranslation("authFeature", { keyPrefix: "Profile" });
  const { t: tInputValidate } = useTranslation("input", { keyPrefix: "validation" });
  const { t: tUser } = useTranslation("userEntity", { keyPrefix: "properties" });
  const { t: tUserGender } = useTranslation("userEntity", { keyPrefix: "constants.genders" });
  const { t: tUserMessage } = useTranslation("userEntity", { keyPrefix: "messages" });

  const [userGendersList, userGendersListObj] = useMemo(() => {
    const gendersList = [
      {
        value: userGenders.MALE,
        label: "male"
      },
      {
        value: userGenders.FEMALE,
        label: "female"
      },
      {
        value: userGenders.OTHER,
        label: "other"
      }
    ];

    const gendersListObj = gendersList.reduce((obj, cur) => {
      return {
        ...obj,
        [cur?.value]: cur
      };
    }, {});

    return [gendersList, gendersListObj];
  }, []);

  const handleSaveDetail = async ({ phoneNumber, email, name, address, gender, dob, healthInsurance }) => {
    const data = {
      phoneNumber,
      email,
      name,
      address,
      gender,
      dob,
      healthInsurance
    };

    // console.log("save: ", { phoneNumber, email, name, address, gender, dob, healthInsurance });

    await fetchApi(async () => {
      const res = await userServices.editUserInfo(data);
      if (res?.success) {
        await loadData();
        return { success: true };
      }

      toast(res.message);
      return { error: res.message };
    });
  };

  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 4,
        px: {
          xl: 8,
          lg: 6,
          md: 0
        },
        pt: 5,
        pb: 10,
        position: "relative"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card
          sx={{
            boxShadow: "none"
          }}
        >
          <CardHeader
            avatar={<Avatar sx={{ width: 150, height: 150, cursor: "pointer" }} alt={user?.name} src={user?.image} />}
            title={user?.name}
            subheader={user?.id}
          />
        </Card>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t("title.account")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              disabled
              control={control}
              rules={{
                required: tInputValidate("required"),
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: tInputValidate("format")
                },
                maxLength: {
                  value: userInputValidate.EMAIL_MAX_LENGTH,
                  message: tInputValidate("maxLength", {
                    maxLength: userInputValidate.EMAIL_MAX_LENGTH
                  })
                }
              }}
              label={tUser("email")}
              trigger={trigger}
              name="email"
              type="email"
              message={
                user?.emailVerified && user?.email === watch().email
                  ? {
                      type: "success",
                      text: tUserMessage("emailVerifiedSuccess")
                    }
                  : {
                      type: "error",
                      text: tUserMessage("emailVerifiedFailed")
                    }
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              disabled
              control={control}
              rules={{
                required: tInputValidate("required"),
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                  message: tInputValidate("format")
                }
              }}
              label={tUser("phoneNumber")}
              trigger={trigger}
              name="phoneNumber"
              type="phone"
              message={
                user?.phoneVerified && user?.phoneNumber === watch().phoneNumber
                  ? {
                      type: "success",
                      text: tUserMessage("phoneVerifiedSuccess")
                    }
                  : {
                      type: "error",
                      text: tUserMessage("phoneVerifiedFailed")
                    }
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t("title.personality")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <CustomInput
              showCanEditIcon
              control={control}
              rules={{
                required: tInputValidate("required"),
                maxLength: {
                  value: userInputValidate.NAME_MAX_LENGTH,
                  message: tInputValidate("maxLength", {
                    maxLength: userInputValidate.NAME_MAX_LENGTH
                  })
                }
              }}
              label={tUser("name")}
              trigger={trigger}
              name="name"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <CustomInput
              showCanEditIcon
              control={control}
              rules={{
                maxLength: {
                  value: userInputValidate.HEALTH_INSURANCE_MAX_LENGTH,
                  message: tInputValidate("maxLength", {
                    maxLength: userInputValidate.HEALTH_INSURANCE_MAX_LENGTH
                  })
                }
              }}
              label={tUser("healthInsurance")}
              trigger={trigger}
              name="healthInsurance"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              showCanEditIcon
              control={control}
              rules={{
                required: tInputValidate("required")
              }}
              label={tUser("dob")}
              trigger={trigger}
              name="dob"
              type="date"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomInput
              showCanEditIcon
              control={control}
              rules={{
                required: tInputValidate("required"),
                maxLength: {
                  value: userInputValidate.GENDER_MAX_LENGTH,
                  message: tInputValidate("maxLength", {
                    maxLength: userInputValidate.GENDER_MAX_LENGTH
                  })
                }
              }}
              label={tUser("gender")}
              trigger={trigger}
              name="gender"
              childrenType="select"
            >
              <Select
                renderValue={(selected) => {
                  return tUserGender(userGendersListObj[selected]?.label);
                }}
              >
                {userGendersList.map((item) => {
                  return (
                    <MenuItem key={item?.value} value={item?.value}>
                      <ListItemText primary={tUserGender(item?.label)} />
                    </MenuItem>
                  );
                })}
              </Select>
            </CustomInput>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              showCanEditIcon
              control={control}
              rules={{
                maxLength: {
                  value: userInputValidate.ADDRESS_MAX_LENGTH,
                  message: tInputValidate("maxLength", {
                    maxLength: userInputValidate.ADDRESS_MAX_LENGTH
                  })
                }
              }}
              label={tUser("address")}
              trigger={trigger}
              name="address"
              type="text"
              multiline
              rows={6}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            reset(defaultValues);
          }}
          sx={{
            ml: 2,
            bgcolor: theme.palette.warning.light
          }}
          startIcon={<RestartAltIcon color={theme.palette.warning.contrastText} />}
        >
          {t("button.reset")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(handleSaveDetail)}
          sx={{
            ml: 2,
            bgcolor: theme.palette.success.light
          }}
          startIcon={<SaveIcon color={theme.palette.success.contrastText} />}
        >
          {t("button.save")}
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
