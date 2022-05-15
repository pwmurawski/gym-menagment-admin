import { createContext } from "react";

const HomeContext = createContext({
  state: {},
  dispatch: () => {},
});

export default HomeContext;
