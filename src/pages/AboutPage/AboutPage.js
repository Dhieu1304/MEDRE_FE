import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation("aboutPage");
  return <div>{t("title")}</div>;
}
