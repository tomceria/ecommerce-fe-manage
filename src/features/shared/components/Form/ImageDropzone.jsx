import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import iconPlus from "@iconify/icons-bx/bxs-plus-circle";
import iconClose from "@iconify/icons-bx/bx-x";
import iconLeft from "@iconify/icons-bx/bx-left-arrow";
import iconRight from "@iconify/icons-bx/bx-right-arrow";

import { uploadPath } from "../../../../configs/api.config";
import request from "../../../../utils/request.util";
import { colors, alpha } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import speed from "../../../../styles/variables/speed.style";

import Spinner from "../UI/Spinner";

const ImageDropzone = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  rules,
  defaultValue,
  // Others
  errormessage,
  disabled,
  style,
  className
}) => {
  const snackbar = useSnackbar();

  const [localImages, setLocalImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Set form value on localImages changes
  useEffect(() => {
    control.setValue(name, JSON.stringify(localImages.map(image => image.id)));
    if (control.formState.isSubmitted) {
      control.triggerValidation(name);
    }
  }, [localImages]); //eslint-disable-line

  // Set localImages with defaultValue if provided
  useEffect(() => {
    if (Array.isArray(defaultValue.object)) {
      setLocalImages(defaultValue.object);
    }
  }, [defaultValue]);

  const handleOnError = errRes => {
    const { message } = errRes.data;
    snackbar.enqueueSnackbar(message, { variant: "error" });
  };

  const handleOnDrop = useCallback(async acceptedFiles => {
    setIsUploading(true);

    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i += 1) {
      formData.append("uploadingFiles", acceptedFiles[i]);
    }
    try {
      const result = await request("post", "/media/images", formData, "cred,fileUpload");
      setLocalImages(prevState => {
        if (!result.data.images) {
          return prevState;
        }
        return [...prevState, ...result.data.images];
      });
    } catch (e) {
      handleOnError(e.response);
    }

    setIsUploading(false);
  }, []); //eslint-disable-line

  const handleOnSwap = (id, toRight) => {
    const newImages = [...localImages];
    const imgIndex = newImages.map(img => img.id).indexOf(id);
    if (
      imgIndex === -1 ||
      (imgIndex === 0 && !toRight) ||
      (imgIndex === newImages.length - 1 && toRight)
    ) {
      return;
    }
    const opposingImgIndex = !toRight ? imgIndex - 1 : imgIndex + 1;
    const temp = newImages[imgIndex];
    newImages[imgIndex] = newImages[opposingImgIndex];
    newImages[opposingImgIndex] = temp;
    setLocalImages(newImages);
  };

  const handleOnDelete = id => {
    setLocalImages(prevState => {
      return [...prevState].filter(image => image.id !== id);
    });
  };

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
    onDrop: handleOnDrop,
    // accept: "image/*",
    noClick: true,
    noKeyboard: true,
    disabled: disabled || isUploading
  });

  return (
    <FieldContainer className={className}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <ImageDropzoneStyled
        // eslint-disable-next-line
        {...getRootProps({ isDragActive, isDragAccept })}
        className={error && "error"}
      >
        <div className="container" style={style}>
          {localImages.map((img, imgIndex) => (
            <div key={`${img.id}_${img.url}`} className="frame">
              <button
                type="button"
                className="floaty remove"
                onClick={() => handleOnDelete(img.id)}
              >
                <Icon icon={iconClose} className="icon" />
              </button>
              {imgIndex !== 0 && (
                <button
                  type="button"
                  className="floaty moveLeft"
                  onClick={() => handleOnSwap(img.id, false)}
                >
                  <Icon icon={iconLeft} className="icon" />
                </button>
              )}
              {imgIndex !== localImages.length - 1 && (
                <button
                  type="button"
                  className="floaty moveRight"
                  onClick={() => handleOnSwap(img.id, true)}
                >
                  <Icon icon={iconRight} className="icon" />
                </button>
              )}
              <img src={`${uploadPath}/${img.url}`} alt={`${img.id}, ${img.url}`} />
            </div>
          ))}
          {isUploading || disabled ? (
            <div className="frame loading">
              <Spinner style={{ color: colors.white }} />
            </div>
          ) : (
            <button type="button" className="frame add" onClick={open}>
              <Icon icon={iconPlus} className="icon" />
            </button>
          )}
        </div>
        {/* eslint-disable-next-line */}
        <input {...getInputProps()} />
        <Controller
          // Form Identifier
          name={name}
          // react-hook-form Props
          as={<input type="text" disabled style={{ display: "none" }} />}
          control={control}
          rules={rules}
          defaultValue={defaultValue && defaultValue.value ? defaultValue.value : "[]"}
        />
      </ImageDropzoneStyled>
      <p className="errorMsg">{error && errormessage}</p>
    </FieldContainer>
  );
};

export default ImageDropzone;

// PropTypes
ImageDropzone.propTypes = {
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
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      object: PropTypes.arrayOf(PropTypes.shape({}))
    })
  ]),
  // Others
  errormessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
ImageDropzone.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
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

const ImageDropzoneStyled = styled.div`
  height: 10rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }

  transition: ${speed.trans} ease-out;
  transition-property: box-shadow;

  ${props =>
    props.isDragActive
      ? `
    background: ${colors.gray.offwhite};
  `
      : `
    background: ${colors.gray.light};
  `}

  & .container {
    display: flex;
    overflow-x: auto;
  }

  & .frame {
    position: relative;
    background: ${colors.gray.dark};
    height: 8rem;
    width: 8rem;
    min-width: fit-content;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${speed.trans} ease-out;
    transition-property: background-color;
  }
  & .frame:last-child {
    margin: 0;
  }

  & .frame > img {
    max-width: 100%;
    max-height: 100%;
  }

  & .frame.add {
    color: white;
    min-width: 8rem;
  }
  & .frame.add:hover {
    cursor: pointer;
  }
  & .frame.add:hover,
  & .frame.add:focus {
    background: ${colors.gray.darker};
  }

  & .frame.add .icon {
    height: ${remScale(32)};
    width: ${remScale(32)};
  }

  & .frame > .floaty {
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${remScale(24)};
    height: ${remScale(24)};
    background-color: ${colors.white + alpha(50)};
    transition: ${speed.trans} ease-out;
    transition-property: opacity, background-color;
  }
  & .frame > .floaty:hover {
    background-color: ${colors.white + alpha(75)};
    cursor: pointer;
  }

  & .frame > .floaty > .icon {
    height: ${remScale(16)};
    width: ${remScale(16)};
  }

  & .frame > .remove {
    top: ${remScale(2)};
    right: ${remScale(2)};
  }

  & .frame > .moveLeft {
    opacity: 0;
    left: 20%;
    bottom: 10%;
  }
  & .frame > .moveRight {
    opacity: 0;
    right: 20%;
    bottom: 10%;
  }
  & .frame:hover > .moveLeft,
  & .frame:hover > .moveRight {
    opacity: 1;
  }

  & .container button {
    appearance: none;
    border: 0;
    padding: 0;
  }
  & .container button:focus {
    outline: none;
  }
`;
