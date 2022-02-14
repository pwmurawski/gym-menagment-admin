import PropTypes from "prop-types";
import Discount from "./Discount/Discount";

const propTypes = {
  discountsArray: PropTypes.array.isRequired,
};

export default function Discounts({ discountsArray }) {
  return (
    <>
      {discountsArray.map((discount) => (
        <Discount
          key={discount.id}
          id={discount.id}
          name={discount.name}
          discount={discount.discount}
          status={discount.status}
        />
      ))}
    </>
  );
}

Discounts.propTypes = propTypes;
