import './App.css';
import Layout from './components/Layout/Layout';
import Header from './components/Layout/Header/Header';
import Menu from './components/Layout/Menu/Menu';
import Footer from './components/Layout/Footer/Footer';
import { MenuBtnContext } from './context/Context';
import { useState, Suspense } from 'react';
import Home from './page/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './page/404/404';
import Ticket from './page/Ticket/Ticket';
import Discount from './page/Discount/Discount';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Search from './page/Search/Search';

export default function App() {

  const [menuBtnClick, setMenuBtnClick] = useState(false);

  const header = <Header />;

  const menu = <Menu />;

  const content = (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/wyszukaj/:term/*" element={<Search />} />
      </Routes>
    </Suspense>
  );

  const footer = <Footer />;

  return (
    <BrowserRouter>
      <MenuBtnContext.Provider value={{
        menuBtnClick,
        setMenuBtnClick
      }}>
        <Layout
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </MenuBtnContext.Provider>
    </BrowserRouter>
  );
}