import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import orderSlice from "../../redux/slices/orderSlice";
import { AppDispatch } from "../../redux/store";
import { currencyFormat } from "../../utils/format";
import CartItem from "./CartItem";

type Props = {
  cart: any[];
};
function BoxCart({ cart }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const checkQuantity = () => {
    if (cart.length <= 1) return `${cart.length} item`;
    return `${cart.length} items`;
  };
  const getTotal = () => {
    let total = 0;
    cart.forEach(
      (item) => (total = total + item.quantity * item.product.price)
    );
    return currencyFormat(total);
  };
  const goToCheckout = () => {
    if (cart.length > 0) {
      dispatch(orderSlice.actions.setStepOrder(1));
      navigate("/create-order/checkout");
    }
  };
  return (
    <div className="box_shadow_card border_radius_5">
      <div className="p-3 d-flex align-items-center justify-content-between border_bottom_gray_1px">
        <div className="font16 font_family_bold_italic">Cart</div>
        <div className="bg_primary_light color_primary py-1 px-2 border_radius_3 font14 font_family_bold">
          {checkQuantity()}
        </div>
      </div>
      <div className="box_content_cart_navbar px-2">
        {cart.length === 0 ? (
          <div className="w100_per d-flex align-items-center justify-content-center mt-5 flex-column">
            <Icon className="icon100x100 color_primary" icon="bi:cart-x-fill" />
            <div className="font18 font_family_bold_italic color_primary mt-4">
              Cart is Empty
            </div>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <CartItem key={index} product={item} />
            ))}
          </>
        )}
      </div>
      <div className="p-3 border_top_gray_1px">
        <div className="d-flex align-items-center justify-content-between">
          <div className="font16 font_family_bold">Total</div>
          <div className="font16 font_family_bold">{getTotal()}</div>
        </div>
        <button
          onClick={goToCheckout}
          className="btn d-block mt-2 bg_primary font_14 font_family_bold_italic color_white w100_per"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default BoxCart;
