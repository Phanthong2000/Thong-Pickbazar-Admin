import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch } from "react-redux";
import orderSlice from "../../redux/slices/orderSlice";
import { AppDispatch } from "../../redux/store";
import { currencyFormat } from "../../utils/format";
import Avatar from "../Avatar";

type Props = {
  product: any;
};
function CartItem({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteItem = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id !== product.product.id) {
        newCart.push(cart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(orderSlice.actions.setCart(JSON.stringify(newCart)));
  };
  return (
    <div className="d-flex align-items-center justify-content-between mt-2 p-2 border_radius_5 cart_item_navbar">
      <div className="d-flex align-items-center">
        <div>
          <Avatar size={50} shape="circle" url={product.product.image} />
        </div>
        <div>
          <div className="font12 font_family_bold">{product.product.name}</div>
          <div className="font12 color_888 font_family_bold mt-1">
            {product.quantity} x {currencyFormat(product.product.price)}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="font14 font_family_bold color_888">
          {currencyFormat(product.quantity * product.product.price)}
        </div>
        <div>
          <button onClick={handleDeleteItem} className="btn bg_ddd">
            <Icon className="icon20x20 color_888" icon="ci:off-close" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
