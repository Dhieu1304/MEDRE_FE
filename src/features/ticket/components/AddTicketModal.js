import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import CustomInput from "../../../components/CustomInput";
import { useFetchingStore } from "../../../store/FetchingApiStore";
import ticketServices from "../../../services/ticketServices";

function AddTicketModal({ show, setShow, handleAfterAddTicket }) {
  const NAME_MAX_LENGTH = 500;
  const CONTENT_MAX_LENGTH = 5000;
  const { control, trigger, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: ""
    },
    criteriaMode: "all"
  });

  const { t } = useTranslation("supportPage", { keyPrefix: "AddTicketModal" });
  const { t: tSupport } = useTranslation("supportPage", { keyPrefix: "properties" });
  const { t: tInputValidation } = useTranslation("input", { keyPrefix: "validation" });

  const { fetchApi } = useFetchingStore();

  const handleAddTicket = async ({ title, content }) => {
    await fetchApi(async () => {
      const res = await ticketServices.createTicket({ title, content });

      if (res.success) {
        if (handleAfterAddTicket) await handleAfterAddTicket();
        setShow(false);
        return { ...res };
      }
      return { ...res };
    });
  };

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={t("name")}
      submitBtnLabel={t("button")}
      onSubmit={handleSubmit(handleAddTicket)}
    >
      <Grid container>
        <Grid item xl={12} md={12} xs={12} mb={2} px={1}>
          <CustomInput
            control={control}
            rules={{
              required: tInputValidation("required"),
              maxLength: {
                value: NAME_MAX_LENGTH,
                message: tInputValidation("maxLength", {
                  maxLength: NAME_MAX_LENGTH
                })
              }
            }}
            label={tSupport("title")}
            trigger={trigger}
            name="title"
          />
        </Grid>
        <Grid item xl={12} md={12} xs={12} mb={2} px={1}>
          <CustomInput
            control={control}
            rules={{
              required: tInputValidation("required"),
              maxLength: {
                value: CONTENT_MAX_LENGTH,
                message: tInputValidation("maxLength", {
                  maxLength: CONTENT_MAX_LENGTH
                })
              }
            }}
            label={t("content")}
            trigger={trigger}
            name="content"
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

AddTicketModal.defaultProps = {
  handleAfterAddTicket: undefined
};

AddTicketModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  handleAfterAddTicket: PropTypes.func
};

export default AddTicketModal;
