import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/AuthStore";
import images from "../../assets/images";
import "./SupportPage.css";
import { Avatar, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
export default function SupportPage() {
  const authStore = useAuthStore();
  const { t } = useTranslation("supportPage");
  return (
    <>
      <div>{t("title")}</div>
    </>
  );
}
