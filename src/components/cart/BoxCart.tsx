import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { cartSelector } from "../../redux/slices/orderSlice";
import { primaryColor, primaryHoverColor } from "../../theme";
import { currencyFormat } from "../../utils/format";

type Props = {
  handleDrawerCart: (status: boolean) => void;
};
const Container = styled.button`
  position: fixed;
  right: 5px;
  top: 30vh;
  background-color: ${primaryColor};
  z-index: 100;
  padding: 10px;
  border-radius: 5px;
  transition: 0.5s;
  &:hover {
    background-color: ${primaryHoverColor};
  }
`;
function BoxCart({ handleDrawerCart }: Props) {
  const cartString = useSelector(cartSelector);
  const [cart, setCart] = useState<any[]>([]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [cartString]);
  const checkQuantityCart = () => {
    if (cart.length < 2) return `${cart.length} item`;
    return `${cart.length} items`;
  };
  const getTotal = () => {
    let total = 0;
    cart.forEach(
      (item) => (total = total + item.quantity * item.product.price)
    );
    return currencyFormat(total);
  };
  return (
    <Container
      onClick={() => handleDrawerCart(true)}
      className="btn color_white"
    >
      <div>
        <Icon className="icon25x25" icon="clarity:shopping-cart-solid" />
        <span className="font14 font_family_bold_italic ml_10px">
          {checkQuantityCart()}
        </span>
      </div>
      <div className="mt-2 bg_white color_primary py-1 border_radius_5 font16 font_family_italic px-2">
        {getTotal()}
      </div>
    </Container>
  );
}

export default React.memo(BoxCart);
