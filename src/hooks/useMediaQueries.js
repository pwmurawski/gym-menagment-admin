import { useEffect, useState } from "react";

const useMediaQueries = (query) => {
  const mediaQuery = window.matchMedia(query);
  const [isMediaMatch, setIsMediaMatch] = useState(!!mediaQuery.matches);

  const matchMedia = () => {
    const resizeHandler = () => {
      if (mediaQuery.matches) setIsMediaMatch(true);
      else setIsMediaMatch(false);
    };

    window.addEventListener("resize", resizeHandler);
  };

  useEffect(() => {
    matchMedia();
    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return isMediaMatch;
};

export default useMediaQueries;
