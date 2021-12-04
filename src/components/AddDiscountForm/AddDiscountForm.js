import { useEffect, useState } from 'react';
import styles from './AddDiscountForm.module.css';

export default function AddDiscountForm(props) {
    const initFormData = {
        name: '',
        discount: '',
        status: ''
    }

    const [discountData, setDiscountData] = useState(initFormData);
    const [backendMsg, setBackendMsg] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const submit = async (signal) => {

        try {
            const request = await fetch('/discount/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: signal,
                body: JSON.stringify(discountData)
            });
            const res = await request.json();

            if (res.msg.success) {
                setDiscountData(initFormData);
                setBackendMsg({
                    msg: res.msg.success,
                    status: true
                });

                props.setDiscountsArray([...props.discountsArray, res.discount]);
            }

            if (res.msg.error) {
                setBackendMsg({
                    msg: res.msg.error,
                    status: false
                });
            }
            setIsSubmit(false);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (isSubmit) {
            submit(signal);
        }

        return () => {
            abortController.abort();
        }
    }, [isSubmit]);

    useEffect(() => {
        if (backendMsg) {
            const timeOut = setTimeout(() => { setBackendMsg(null) }, 5000);
            return () => {
                clearTimeout(timeOut);
            }
        }
    }, [backendMsg]);

    return (
        <>
            {backendMsg ? (
                <div className={backendMsg.status ? styles.form__success : styles.form__error}>{backendMsg.msg}</div>
            ) : null}

            <form onSubmit={(e) => { e.preventDefault(); setIsSubmit(true) }} className={styles.form}>
                <input value={discountData.name} onChange={e => setDiscountData({ ...discountData, name: e.target.value })} placeholder='Nazwa' className={styles.form__input} type='text' />
                <input value={discountData.discount} onChange={e => setDiscountData({ ...discountData, discount: e.target.value })} placeholder='Zniżka' className={styles.form__input} type='text' />
                <input value={discountData.status} onChange={e => setDiscountData({ ...discountData, status: e.target.value })} placeholder='Status' className={styles.form__input} type='text' />
                <button className={styles.form__btn}>
                    Dodaj
                </button>
            </form>
        </>
    );
}