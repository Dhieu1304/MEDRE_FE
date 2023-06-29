import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/AuthStore";

export default function SupportPage() {
  const authStore = useAuthStore();
  const { t } = useTranslation("supportPage");
  return (
    <div>
      {t("title")} - {authStore.user?.name}
    </div>
  );
}
