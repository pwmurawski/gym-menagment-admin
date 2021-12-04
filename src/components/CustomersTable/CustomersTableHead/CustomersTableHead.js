import styles from './CustomersTableHead.module.css';

export default function CustomersTableHead(props) {
    return (
        <thead className={styles.head}>
            <tr>
                {props.headers.map(header => <th key={header}>{header}</th>)}
            </tr>
        </thead>
    );
}