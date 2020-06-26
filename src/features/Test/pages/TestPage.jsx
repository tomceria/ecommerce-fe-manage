import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import TestPageCtn from "../containers/TestPageCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const TestPage = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/" style={{ flexGrow: 1 }}>
            <Button color="primary">Somewhere</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Test form</h2>
        <TestPageCtn />
      </LayoutCard>
    </>
  );
};

export default TestPage;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;
