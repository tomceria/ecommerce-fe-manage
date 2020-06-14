import React from "react";
import { useTranslation } from "react-i18next";

import EditShopCtn from "../containers/EditShopCtn";
// import DeleteBranddCtn from "../containers/DeleteBranddCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
// import Button from "../../shared/components/Form/Button";

const EditShop = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.SHOP.HOME")}</h2>
        <EditShopCtn />
      </LayoutCard>
    </>
  );
};

export default EditShop;
