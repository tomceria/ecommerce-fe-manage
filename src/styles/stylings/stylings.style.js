import { scaling } from "../variables/size.style";

const stylings = {
  boxShadow: {
    low: "box-shadow: rgba(187, 187, 187, 0.2) 0px 0px 1px 2px",
    high: "box-shadow: 0 0 5px #5d5d5d45"
  },
  borderRadius: {
    sm: "border-radius: 0.25rem",
    md: "border-radius: 0.5rem",
    lg: "border-radius: 0.1rem"
  },
  mediaQuery: {
    bg: "min-width: 769px",
    sm: "max-width: 768px",
    hover: "hover: hover",
    touch: "hover: none"
  }
};

export default stylings;

export const templates = {
  EVENLY_SPACED: `
    display: flex;

    & > * {
      display: flex;
    }

    & > *:nth-child(odd),
    & > * > *:nth-child(odd) {
      margin-right: 0.5rem;
    }

    & > *:nth-child(even),
    & > * > *:nth-child(even) {
      margin-left: 0.5rem;
    }

    & > * > *:only-child {
      margin: 0;
    }

    @media (${stylings.mediaQuery.sm}) {
      & {
        flex-direction: column;
      }

      & > * {
        width: auto !important;
        margin: 0 0 1rem !important;
      }

      & > *:last-child {
        margin: 0 !important;
      }
    }
  `,
  FORM: {
    BASIC: `

    display: flex;
    flex-direction: column;

    & > * {
      margin-top: ${scaling("lg")} !important;
    }
    & > *:nth-child(1) {
      margin-top: 0 !important;
    }
    `
  }
};
