import React from "react";
import { useTranslation } from "react-i18next";

import { LayoutCard } from "../../shared/components/UI/Card";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCard>
        <h1>{t("DASHBOARD.HOME.WELCOMEMSG")}</h1>
      </LayoutCard>
    </>
  );
};

export default Home;
