import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import iconSearch from "@iconify/icons-bx/bx-search";
import { useTranslation } from "react-i18next";

import { supportTicketFilterModel as model } from "../models";

import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const SupportTicketFilterForm = ({ isLoading, filtersReloaded }) => {
  const formFuncs = useFormContext();
  const { t } = useTranslation();

  const formFieldDisplay = fieldName => (
    <div key={fieldName}>
      <FormField
        model={model(t).find(a => a.name === fieldName)}
        formFuncs={formFuncs}
        changed={filtersReloaded}
        disabled={isLoading}
        style={{ flexGrow: 1 }}
      />
    </div>
  );

  return (
    <div style={{ flexDirection: "column" }}>
      <FilterFormDiv>
        <div>
          <FormField
            model={model(t).find(a => a.name === "query")}
            formFuncs={formFuncs}
            disabled={isLoading}
            style={{ flexGrow: 1 }}
          />
          <Button type="submit" color="primary" disabled={isLoading}>
            <Icon icon={iconSearch} />
          </Button>
        </div>
        {["supportTypeId", "statusId"].map(formFieldDisplay)}
      </FilterFormDiv>
      <FilterFormDiv>{["customer", "support"].map(formFieldDisplay)}</FilterFormDiv>
    </div>
  );
};

export default SupportTicketFilterForm;

// PropTypes
SupportTicketFilterForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  filtersReloaded: PropTypes.func.isRequired
};

// Styles
const FilterFormDiv = styled.div`
  ${templates.EVENLY_SPACED}

  margin-bottom: 1rem;
`;
