import { useState, useEffect } from "react";

export function useShopSubInfo() {
  // const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    // eslint-disable-next-line
  }, []);

  return isReady;
}

export default {};
