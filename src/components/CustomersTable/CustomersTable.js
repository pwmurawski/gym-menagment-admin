import { useEffect, useRef } from 'react';
import styles from './CustomersTable.module.css';

export default function CustomersTable(props) {
    const tableScrolRef = useRef(null);

    useEffect(() => {
        tableScrolRef.current.style.maxHeight = props.size ?? '60vh';
    }, [props.size]);

    if (props.pagination) {
        const scrollHandler = () => {
            const scrollBarPosition = tableScrolRef.current.scrollTop;
            const positionSetTablePage = tableScrolRef.current.scrollHeight - tableScrolRef.current.clientHeight;

            for (let i = 0; i < props.tablePage.totalPages - 1; i++) {
                if (props.tablePage.currentPage === i && scrollBarPosition === positionSetTablePage) {
                    props.setTablePage({ ...props.tablePage, currentPage: i + 1 });
                }
            }
        }

        return (
            <div onScroll={scrollHandler} ref={tableScrolRef} className={styles.tableScrollContainer}>
                <table className={styles.table}>
                    {props.children}
                </table>
            </div>
        );
    } else {
        return (
            <div ref={tableScrolRef} className={styles.tableScrollContainer}>
                <table className={styles.table}>
                    {props.children}
                </table>
            </div>
        );
    }
}