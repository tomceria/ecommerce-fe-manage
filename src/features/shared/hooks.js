import { useEffect } from "react";

export function useHandler(handler, deps) {
  useEffect(() => {
    if (handler) {
      handler(...deps);
    }
    // eslint-disable-next-line
  }, deps);
}

export default {};
