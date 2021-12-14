import PropTypes from "prop-types";
import { useContext } from "react";
import ReducerContext from "../../../context/Context";
import styles from "./CustomersTableBody.module.css";

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default function CustomersTableBody({ children }) {
  const stateGlobal = useContext(ReducerContext);

  return (
    <tbody className={`${styles.body} ${styles[stateGlobal.state.theme]}`}>
      {children}
    </tbody>
  );
}

CustomersTableBody.propTypes = propTypes;
