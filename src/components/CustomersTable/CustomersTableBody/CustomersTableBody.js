import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default function CustomersTableBody({ children }) {
  return <tbody>{children}</tbody>;
}

CustomersTableBody.propTypes = propTypes;
