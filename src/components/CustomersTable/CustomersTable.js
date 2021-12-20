import PropTypes from "prop-types";
import { useContext, useEffect, useRef } from "react";
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
  const tableScrolRef = useRef(null);
  const stateGlobal = useContext(ReducerContext);

  useEffect(() => {
    tableScrolRef.current.style.maxHeight = size;
  }, []);

  if (pagination) {
    const scrollHandler = () => {
      const scrollBarPosition = tableScrolRef.current.scrollTop;
      const positionSetTablePage =
        tableScrolRef.current.scrollHeight - tableScrolRef.current.clientHeight;

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
        ref={tableScrolRef}
        className={styles.tableScrollContainer}
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
    <div ref={tableScrolRef} className={styles.tableScrollContainer}>
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
