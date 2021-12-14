import PropTypes from "prop-types";
import { useContext } from "react";
import ReducerContext from "../../../context/Context";
import styles from "./CustomersTableHead.module.css";

const propTypes = {
  headers: PropTypes.array.isRequired,
};

export default function CustomersTableHead({ headers }) {
  const stateGlobal = useContext(ReducerContext);

  return (
    <thead className={`${styles.head} ${styles[stateGlobal.state.theme]}`}>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

CustomersTableHead.propTypes = propTypes;
