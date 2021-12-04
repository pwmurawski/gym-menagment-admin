import { useEffect, useState } from 'react';
import styles from './AddTicketForm.module.css';

export default function AddTicketForm(props) {
    const initFormData = {
        name: '',
        price: '',
        activeDays: ''
    }

    const [ticketData, setTicketData] = useState(initFormData);
    const [backendMsg, setBackendMsg] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const submit = async (signal) => {

        try {
            const request = await fetch('/ticket/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: signal,
                body: JSON.stringify(ticketData)
            });
            const res = await request.json();

            if (res.msg.success) {
                setTicketData(initFormData);
                setBackendMsg({
                    msg: res.msg.success,
                    status: true
                });

                props.setTicketsArray([...props.ticketsArray, res.ticket]);
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
                <input value={ticketData.name} onChange={e => setTicketData({ ...ticketData, name: e.target.value })} placeholder='Nazwa' className={styles.form__input} type='text' />
                <input value={ticketData.price} onChange={e => setTicketData({ ...ticketData, price: e.target.value })} placeholder='Cena' className={styles.form__input} type='text' />
                <input value={ticketData.activeDays} onChange={e => setTicketData({ ...ticketData, activeDays: e.target.value })} placeholder='Liczba dni' className={styles.form__input} type='text' />
                <button className={styles.form__btn}>
                    Dodaj
                </button>
            </form>
        </>
    );
}