import React from "react";

import EditShopCtn from "../containers/EditShopCtn";
// import DeleteBranddCtn from "../containers/DeleteBranddCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
// import Button from "../../shared/components/Form/Button";

const EditShop = () => {
  return (
    <>
      <LayoutCard>
        <h2 className="title">Shop Info</h2>
        <EditShopCtn />
      </LayoutCard>
    </>
  );
};

export default EditShop;
