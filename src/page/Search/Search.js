import styles from './Search.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

export default function Search() {
    const [loading, setLoading] = useState(true);
    const [customersArray, setCustomersArray] = useState([]);
    const { term } = useParams();

    const search = async (signal) => {
        try {
            const require = await fetch(`/customer/search?q=${term}`, {
                signal: signal
            });
            const res = await require.json();

            setCustomersArray(res.customers);
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

        search(signal);

        return () => {
            abortController.abort();
        }
    }, [term]);

    return (
        <>
            {loading ? <LoadingIcon /> : (
                <div className={styles.pageContainer}>
                    <h2>Wyniki wyszukiwania:</h2>
                    <CustomersTable size={'67vh'}>
                        <CustomersTableHead headers={['Imie', 'Nazwisko', 'Numer', 'Karnet', 'Znizka', 'Data']} />
                        <CustomersTableBody>
                            <Customers customersArray={customersArray} setCustomersArray={setCustomersArray} />
                        </CustomersTableBody>
                    </CustomersTable>
                </div>
            )}
        </>
    );
}