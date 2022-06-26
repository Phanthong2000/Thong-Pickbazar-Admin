import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Drawer } from "rsuite";
import orderSlice, { cartSelector } from "../../redux/slices/orderSlice";
import { AppDispatch } from "../../redux/store";
import { currencyFormat } from "../../utils/format";
import DrawerCartItem from "./DrawerCartItem";

type Props = {
  isShow: boolean;
  handleDrawer: (status: boolean) => void;
};

function DrawerCart({ isShow, handleDrawer }: Props) {
  const cartString = useSelector(cartSelector);
  const [cart, setCart] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
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
  const goToCheckout = () => {
    if (cart.length > 0) {
      dispatch(orderSlice.actions.setStepOrder(1))
      navigate("/create-order/checkout");
    }

  };
  return (
    <Drawer
      size="sm"
      placement="right"
      open={isShow}
      onClose={() => handleDrawer(false)}
    >
      <Drawer.Header>
        <Drawer.Actions>
          <div className="d-flex align-items-center">
            <Icon
              className="icon30x30 color_primary"
              icon="clarity:shopping-cart-solid"
            />
            <div className="font16 font_family_bold_italic ml_10px color_primary">
              {checkQuantityCart()}
            </div>
          </div>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body className="p-0 m-0 d-flex flex-column align-items-center justify-content-between">
        {
          cart.length === 0 ?
            <div className="mt-4 h100_per d-flex align-items-center justify-content-center flex-column">
              <Icon className="icon100x100 color_primary" icon="bi:cart-x-fill" />
              <div className="font18 font_family_bold_italic color_primary mt-4">
                Cart is Empty
              </div>
            </div>
            :
            <div className="w100_per">
              {cart.map((item, index) => (
                <DrawerCartItem product={item} key={index} />
              ))}
            </div>
        }
        <div onClick={goToCheckout} className="checkout_cart">
          <div className="ml_20px color_white font16 font_family_bold">
            Checkout
          </div>
          <div className="font16 font_family_bold_italic total_cart px-2">
            {getTotal()}
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
}

export default React.memo(DrawerCart);
