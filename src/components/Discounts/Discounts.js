import Discount from './Discount/Discount';

export default function Discounts(props) {
    return (
        <>
            {props.discountsArray.map(discount => <Discount key={discount.id} discountsArray={props.discountsArray} setDiscountsArray={props.setDiscountsArray} {...discount} />)}
        </>
    );
}