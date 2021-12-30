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
          id={discount.id}
          name={discount.name}
          discount={discount.discount}
          status={discount.status}
          discountsArray={discountsArray}
          setDiscountsArray={setDiscountsArray}
        />
      ))}
    </>
  );
}

Discounts.propTypes = propTypes;
