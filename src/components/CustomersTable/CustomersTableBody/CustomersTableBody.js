import styles from './CustomersTableBody.module.css';

export default function CustomersTableBody(props) {
    return (
        <tbody className={styles.body}>
            {props.children}
        </tbody>
    );
}