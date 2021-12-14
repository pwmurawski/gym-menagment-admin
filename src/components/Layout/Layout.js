import PropTypes from "prop-types";
import styles from "./Layout.module.css";

const propTypes = {
  menu: PropTypes.element.isRequired,
  header: PropTypes.element.isRequired,
  content: PropTypes.element.isRequired,
  footer: PropTypes.element.isRequired,
};

export default function Layout({ menu, header, content, footer }) {
  return (
    <div className={styles.container}>
      <aside className={styles.menu}>
        <nav>{menu}</nav>
      </aside>
      <div className={styles.column_wrapper}>
        <header className={styles.header}>{header}</header>
        <main className={styles.content}>{content}</main>
        <footer className={styles.footer}>{footer}</footer>
      </div>
    </div>
  );
}

Layout.propTypes = propTypes;
