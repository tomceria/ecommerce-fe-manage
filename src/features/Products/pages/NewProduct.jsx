import React from "react";

import NewProductCtn from "../containers/NewProductCtn";
import { LayoutCard } from "../../shared/components/UI/Card";

const NewProduct = () => {
  return (
    <LayoutCard>
      <NewProductCtn />
    </LayoutCard>
  );
};

export default NewProduct;
