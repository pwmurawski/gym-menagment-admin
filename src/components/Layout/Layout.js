import styles from './Layout.module.css';

export default function Layout(props) {
    return (
        <div className={styles.container}>
            <aside className={styles.menu}>
                <nav>{props.menu}</nav>
            </aside>
            <div className={styles.column_wrapper}>
                <header className={styles.header}>{props.header}</header>
                <main className={styles.content}>{props.content}</main>
                <footer className={styles.footer}>{props.footer}</footer>
            </div>
        </div>
    );
}