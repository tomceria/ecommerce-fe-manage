import stylings from "../styles/stylings/stylings.style";

export const isDesktop = mediaQueryHook => mediaQueryHook({ query: `(${stylings.mediaQuery.bg})` });
export const isMobile = mediaQueryHook => mediaQueryHook({ query: `(${stylings.mediaQuery.sm})` });
export const isPortrait = mediaQueryHook => mediaQueryHook({ query: "(orientation: portrait)" });
export const isLandscape = mediaQueryHook => mediaQueryHook({ query: "(orientation: landscape)" });
