import styles from './Menu.module.css';
import imgLogo from '../../../assets/logo.png';
import imgKarnet from '../../../assets/karnet.png';
import imgPrice from '../../../assets/price-tag.png';
import imgUser from '../../../assets/user.png';
import imgCustomer from '../../../assets/customer.png';
import { useContext, useEffect, useRef } from 'react';
import { MenuBtnContext } from '../../../context/Context';
import { Link } from 'react-router-dom';

export default function Menu() {

    const menuRef = useRef(null);
    const menuBtnCon = useContext(MenuBtnContext);
    const mediaQuery = window.matchMedia('(max-width: 760px)');

    const media_menuHidden = () => {
        const resizeHandler = () => {
            if (mediaQuery.matches) {
                menuRef.current.style.display = 'none';
                menuRef.current.style.width = '';
                menuBtnCon.setMenuBtnClick(false);
            }
            else {
                menuRef.current.style.display = '';
                menuBtnCon.setMenuBtnClick(false);
            }
        }

        window.addEventListener('resize', resizeHandler);
    }

    useEffect(() => {
        media_menuHidden();
        return () => {
            window.removeEventListener('resize');
        }
    }, []);

    const menuBtnHandler = () => {
        if (mediaQuery.matches) {
            if (menuBtnCon.menuBtnClick) {
                menuRef.current.style.display = '';
            }
            else
                menuRef.current.style.display = 'none';
        }
        else {
            if (menuBtnCon.menuBtnClick)
                menuRef.current.style.width = '270px';
            else
                menuRef.current.style.width = '';
        }
    }

    useEffect(() => {
        menuBtnHandler();
    }, [menuBtnCon.menuBtnClick]);

    return (
        <div className={styles.menu} ref={menuRef}>
            <div className={styles.menu__logo}>
                <img className={styles.logo__img} src={imgLogo} alt='logo' />
                <h1>Gym</h1>
            </div>
            <ul className={styles.menu__list}>
                <Link className={styles.link} to='/'>
                    <li className={`${styles.list__item} ${menuBtnCon.menuBtnClick ? styles.itemListMenuOpen : null}`}>
                        <img className={styles.item__img} src={imgCustomer} alt='customers' />
                        <p className={styles.list__item__text}>Strona główna</p>
                    </li>
                </Link>
                <Link className={styles.link} to='ticket'>
                    <li className={`${styles.list__item} ${menuBtnCon.menuBtnClick ? styles.itemListMenuOpen : null}`}>
                        <img className={styles.item__img} src={imgKarnet} alt='ticket' />
                        <p className={styles.list__item__text}>Karnet</p>
                    </li>
                </Link>
                <Link className={styles.link} to='discount'>
                    <li className={`${styles.list__item} ${menuBtnCon.menuBtnClick ? styles.itemListMenuOpen : null}`}>
                        <img className={styles.item__img} src={imgPrice} alt='price' />
                        <p className={styles.list__item__text}>Znizka</p>
                    </li>
                </Link>
                <li className={`${styles.list__item} ${menuBtnCon.menuBtnClick ? styles.itemListMenuOpen : null}`}>
                    <img className={styles.item__img} src={imgUser} alt='user' />
                    <p className={styles.list__item__text}>Konto</p>
                </li>
            </ul>
        </div>
    );
}