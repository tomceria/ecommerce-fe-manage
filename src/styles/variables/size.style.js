const fontSize = 16;

export const remScale = scale => {
  // Pixel to REM
  return `${scale / fontSize}rem`;
};

export const scaling = scale => {
  switch (scale) {
    case "sm": {
      return "0.5rem";
    }
    case "md":
    default: {
      return "1rem";
    }
    case "lg": {
      return "2rem";
    }
  }
};
