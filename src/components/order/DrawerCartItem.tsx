import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import orderSlice from "../../redux/slices/orderSlice";
import { AppDispatch } from "../../redux/store";
import { currencyFormat } from "../../utils/format";
import Avatar from "../Avatar";

type Props = {
  product: any;
};
const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(229, 231, 235);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoxQuantity = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
`;
function DrawerCartItem({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const handlePlusQuantity = () => {
    const quantity = product.product.quantity;
    let quantityPlus = 0;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.product.id) {
        quantityPlus = cart[i].quantity + 1
        newCart.push({
          ...cart[i],
          quantity: cart[i].quantity + 1,
        });
      } else {
        newCart.push(cart[i]);
      }
    }
    if (quantity - quantityPlus >= 0) {
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatch(orderSlice.actions.setCart(JSON.stringify(newCart)));
    }
  };
  const handleMinusQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.product.id) {
        if (cart[i].quantity > 1)
          newCart.push({
            ...cart[i],
            quantity: cart[i].quantity - 1,
          });
      } else {
        newCart.push(cart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(orderSlice.actions.setCart(JSON.stringify(newCart)));
  };
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
    <Container>
      <div className="d-flex align-items-center">
        <BoxQuantity className="bg_gray">
          <button onClick={handlePlusQuantity} className="btn bg_gray">
            <Icon icon="akar-icons:plus" />
          </button>
          <div className="font16 font_family_bold_italic d-flex align-items-center h100_per">
            {product.quantity}
          </div>
          <button onClick={handleMinusQuantity} className="btn bg_gray">
            <Icon icon="akar-icons:minus" />
          </button>
        </BoxQuantity>
        <div className="ml_20px">
          <Avatar shape="rectangle" size={60} url={product.product.image} />
        </div>
        <div className="ml_20px">
          <div className="font16 font_family_bold">{product.product.name}</div>
          <div className="mt-1 color_primary font14 font_family_bold">
            {currencyFormat(product.product.price)}
          </div>
          <div className="color_888 font_family_regular mt-1">
            {product.quantity} x {product.product.unit}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="mr_20px font_family_bold_italic font16">
          {currencyFormat(product.product.price * product.quantity)}
        </div>
        <button onClick={handleDeleteItem} className="btn">
          <Icon icon="ep:close-bold" className="icon20x20 color_red" />
        </button>
      </div>
    </Container>
  );
}

export default React.memo(DrawerCartItem);
