import styles from './Discount.module.css';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import CustomersTableHead from '../../components/CustomersTable/CustomersTableHead/CustomersTableHead';
import CustomersTableBody from '../../components/CustomersTable/CustomersTableBody/CustomersTableBody';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import Discounts from '../../components/Discounts/Discounts';
import AddDiscountForm from '../../components/AddDiscountForm/AddDiscountForm';

export default function Discount() {

    const [discountsArray, setDiscountsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDiscounts = async (signal) => {
        try {
            const request = await fetch('/discount', {
                signal: signal
            });
            const res = await request.json();

            setDiscountsArray(res.discounts);
            setLoading(false);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchDiscounts(signal);
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <>
            {loading ? <LoadingIcon /> : (
                <div className={styles.pageContainer}>
                    <h2>Znizki:</h2>
                    <AddDiscountForm discountsArray={discountsArray} setDiscountsArray={setDiscountsArray} />

                    <CustomersTable>
                        <CustomersTableHead headers={['Nazwa', 'Zniżka', 'Status']} />
                        <CustomersTableBody>
                            <Discounts discountsArray={discountsArray} setDiscountArray={setDiscountsArray} />
                        </CustomersTableBody>
                    </CustomersTable>
                </div>
            )}
        </>
    );
}