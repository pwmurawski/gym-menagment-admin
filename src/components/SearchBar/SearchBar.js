import styles from './SearchBar.module.css';
import searchImg from '../../assets/search.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [formData, setFormData] = useState({
        search: ' ',
        searchFor: ''
    });
    const navigate = useNavigate();


    const search = async (signal) => {
        navigate(`/wyszukaj/${formData.search === '' ? '=' : formData.search}${formData.searchFor}`);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (formData.search !== ' ') {
            search(signal);
        }

        return () => {
            abortController.abort();
        }
    }, [formData.search, isSubmit]);

    return (
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmit(!isSubmit) }} className={styles.search}>
            <input onChange={e => setFormData({ ...formData, search: e.target.value })} className={styles.search__input} type='text' placeholder='Szukaj...' />
            <select onChange={e => setFormData({ ...formData, searchFor: e.target.value })} className={styles.search__select}>
                <option value=''>Szukaj po...</option>
                <option value='&f=firstName'>Imie</option>
                <option value=''>Nazwisko</option>
                <option value='&f=code'>Code</option>
            </select>
            <button type='submit' className={styles.search__btn}>
                <img className={styles.btn__img} src={searchImg} alt='search' />
            </button>
        </form>
    );
}