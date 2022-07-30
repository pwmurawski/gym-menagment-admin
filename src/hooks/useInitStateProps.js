import { useEffect, useState } from "react";

const useInitStateProps = (id, initialState) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (id) {
      setState(initialState);
    }
  }, [id]);

  return [state, setState];
};

export default useInitStateProps;
