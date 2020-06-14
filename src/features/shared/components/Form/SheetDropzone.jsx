import React, { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { remScale } from "../../../../styles/variables/size.style";
import { colors } from "../../../../styles/variables/colors.style";
import { useTranslation } from "react-i18next";

const SheetDropzone = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  rules,
  // defaultValue,
  // Others
  errormessage,
  disabled,
  style,
  className
}) => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const [localSheetRows, setLocalSheetRows] = useState([]);
  const [fileName, setFileName] = useState(null);

  // Set form value on localSheetRows changes
  useEffect(() => {
    control.setValue(name, JSON.stringify(localSheetRows));
    if (control.formState.isSubmitted) {
      control.triggerValidation(name);
    }
  }, [localSheetRows]); //eslint-disable-line

  const handleOnChange = event => {
    const fileObj = event.target.files[0];
    if (!fileObj) {
      return;
    }
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        snackbar.enqueueSnackbar(err, { variant: "error" });
      } else {
        setFileName(fileObj.name);
        setLocalSheetRows(resp.rows.slice(1));
      }
    });
  };

  return (
    <FieldContainer className={className}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <SheetDropzoneStyled style={style} className={error && "error"}>
        <FileInputStyled
          type="file"
          accept=".xlsx"
          onChange={handleOnChange}
          disabled={disabled}
          style={{ marginRight: "1rem" }}
          t={t}
        />
        {localSheetRows.length > 0 ? <b>{fileName}</b> : <span>(.xlsx)</span>}
      </SheetDropzoneStyled>
      <p className="errorMsg">{error && errormessage}</p>
      {/* Hidden Controller */}
      <Controller
        // Form Identifier
        name={name}
        // react-hook-form Props
        as={<input type="text" disabled style={{ display: "none" }} />}
        control={control}
        rules={rules}
        defaultValue=""
      />
    </FieldContainer>
  );
};

export default SheetDropzone;

// PropTypes
SheetDropzone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // react-hook-form Props
  error: PropTypes.bool,
  control: PropTypes.shape({
    setValue: PropTypes.func,
    triggerValidation: PropTypes.func,
    formState: PropTypes.shape({
      isSubmitted: PropTypes.bool
    })
  }).isRequired,
  rules: PropTypes.shape({}),
  // defaultValue: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.shape({
  //     value: PropTypes.string,
  //     object: PropTypes.arrayOf(PropTypes.shape({}))
  //   })
  // ]),
  // Others
  errormessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
SheetDropzone.defaultProps = {
  rules: undefined,
  // defaultValue: undefined,
  disabled: false,
  style: {},
  error: undefined,
  errormessage: "",
  className: ""
};

// Styles
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .label {
    margin-bottom: 1rem;
  }

  & > .errorMsg {
    color: ${colors.scheme.error.normal};
    margin: ${remScale(4)} ${remScale(14)} 0;
    font-size: 0.75rem;
  }
`;

const SheetDropzoneStyled = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  background: ${colors.white};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }
`;

const FileInputStyled = styled.input`
  padding: 0.75rem 1rem;
  width: ${remScale(98)};
  height: ${remScale(40)};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: #e0e0e0;
  border-radius: ${remScale(4)};
  &:disabled {
    box-shadow: none;
    color: #a9a9a9 !important;
  }
  &:hover {
    cursor: pointer;
  }

  &::-webkit-file-upload-button {
    display: none;
  }

  &::after {
    content: "${props => props.t("UI.FORM.IMPORT")}...";
    font-size: 0.875rem;
    font-weight: 500;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
  }
`;
