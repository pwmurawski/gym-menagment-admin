import { useReducer, Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Layout/Menu/Menu";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./page/Home/Home";
import NotFound from "./page/404/404";
import Ticket from "./page/Ticket/Ticket";
import Discount from "./page/Discount/Discount";
import LoadingIcon from "./components/UI/LoadingIcon/LoadingIcon";
import Search from "./page/Search/Search";
import ReducerContext from "./context/Context";
import HomeContext from "./context/HomeContext";
import { reducer, initialState } from "./reducers/reducer";
import { homeReducer, initialState as initState } from "./reducers/homeReducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateMemo = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const [stateH, dispatchH] = useReducer(homeReducer, initState);
  const homeReducerValue = useMemo(
    () => ({ stateH, dispatchH }),
    [stateH, dispatchH]
  );
  document.body.setAttribute("class", state.theme);

  const header = <Header />;

  const menu = <Menu />;

  const content = (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/wyszukaj/:term" element={<Search />} />
      </Routes>
    </Suspense>
  );

  const footer = <Footer />;

  return (
    <BrowserRouter>
      <ReducerContext.Provider value={stateMemo}>
        <HomeContext.Provider value={homeReducerValue}>
          <Layout
            header={header}
            menu={menu}
            content={content}
            footer={footer}
          />
        </HomeContext.Provider>
      </ReducerContext.Provider>
    </BrowserRouter>
  );
}
