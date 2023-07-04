import { useTranslation } from "react-i18next";
import "./AboutPage.css";

export default function AboutPage() {
  const { t } = useTranslation("aboutPage");
  return (
    <div>
      <div className="about-title">
        <h2>{t("title").toUpperCase()}</h2>
      </div>

      <div className="about-content">
        <h3>{t("about-content.intro1")}</h3>
        <h3>{t("about-content.intro2")}</h3>
        <h3>{t("about-content.intro3")}</h3>
        <h4>{t("about-content.feature1")}</h4>
        <h4>{t("about-content.feature2")}</h4>
        <h4>{t("about-content.feature3")}</h4>
        <h4>{t("about-content.feature4")}</h4>
        <h3>{t("about-content.outro1")}</h3>
        <h3>{t("about-content.outro2")}</h3>
      </div>

      <div className="process-title">
        <h2>{t("process").toUpperCase()}</h2>
      </div>
      <div className="process-content">
        <h3>
          <b>{t("process-content.feature1.name").toUpperCase()}</b>
        </h3>
        <h4>{t("process-content.feature1.step1")}</h4>
        <h4>{t("process-content.feature1.step2")}</h4>
        <h4>{t("process-content.feature1.step3")}</h4>
        <h4>{t("process-content.feature1.step4")}</h4>
        <h3>
          <b>{t("process-content.feature2.name").toUpperCase()}</b>
        </h3>
        <h4>{t("process-content.feature2.step1")}</h4>
        <h4>{t("process-content.feature2.step2")}</h4>
        <h4>{t("process-content.feature2.step3")}</h4>
      </div>
    </div>
  );
}
