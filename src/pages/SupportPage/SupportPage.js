import { useTranslation } from "react-i18next";
import "./SupportPage.css";

export default function SupportPage() {
  const { t } = useTranslation("supportPage");
  return <div>{t("title")}</div>;
}
