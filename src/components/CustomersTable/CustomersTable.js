import PropTypes from "prop-types";
import { useContext } from "react";
import ReducerContext from "../../context/Context";
import styles from "./CustomersTable.module.css";

const propTypes = {
  pagination: PropTypes.bool,
  size: PropTypes.string,
  tablePage: PropTypes.object,
  setTablePage: PropTypes.func,
  children: PropTypes.array.isRequired,
};

const defaultProps = {
  pagination: false,
  size: "60vh",
  tablePage: null,
  setTablePage: null,
};

export default function CustomersTable({
  pagination,
  size,
  tablePage,
  setTablePage,
  children,
}) {
  const stateGlobal = useContext(ReducerContext);

  if (pagination) {
    const scrollHandler = (e) => {
      const scrollBarPosition = Math.floor(e.target.scrollTop);
      const positionSetTablePage = Math.floor(
        e.target.scrollHeight - e.target.clientHeight
      );

      for (let i = 0; i < tablePage.totalPages - 1; i += 1) {
        if (
          tablePage.currentPage === i &&
          scrollBarPosition === positionSetTablePage
        ) {
          setTablePage({ ...tablePage, currentPage: i + 1 });
        }
      }
    };

    return (
      <div
        onScroll={scrollHandler}
        className={styles.tableScrollContainer}
        style={{ maxHeight: size }}
      >
        <table
          className={`${styles.table} ${styles[stateGlobal.state.theme] ?? ""}`}
        >
          {children}
        </table>
      </div>
    );
  }

  return (
    <div className={styles.tableScrollContainer} style={{ maxHeight: size }}>
      <table
        className={`${styles.table} ${styles[stateGlobal.state.theme] ?? ""}`}
      >
        {children}
      </table>
    </div>
  );
}

CustomersTable.propTypes = propTypes;
CustomersTable.defaultProps = defaultProps;
