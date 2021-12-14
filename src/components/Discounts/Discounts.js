import PropTypes from "prop-types";
import Discount from "./Discount/Discount";

const propTypes = {
  discountsArray: PropTypes.array.isRequired,
  setDiscountsArray: PropTypes.func.isRequired,
};

export default function Discounts({ discountsArray, setDiscountsArray }) {
  return (
    <>
      {discountsArray.map((discount) => (
        <Discount
          key={discount.id}
          discountsArray={discountsArray}
          setDiscountsArray={setDiscountsArray}
          name={discount.name}
          discount={discount.discount}
          status={discount.status}
        />
      ))}
    </>
  );
}

Discounts.propTypes = propTypes;
