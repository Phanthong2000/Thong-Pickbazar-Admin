import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import orderSlice from "../../redux/slices/orderSlice";
import { AppDispatch } from "../../redux/store";
import { currencyFormat } from "../../utils/format";

type Props = {
  product: any;
  cart: any[];
};
const Container = styled.div`
  background-color: #fff;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
function ProductItem({ product, cart }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [item, setItem] = useState<any>();
  useEffect(() => {
    if (cart) setItem(cart.find((item) => item.product.id === product.id));
  }, [cart]);
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isSimple = Boolean(product.type === "simple");
    cart.push({
      product: {
        id: product.id,
        name: product.name_en,
        image: product.featureImage,
        price: isSimple ? product.simple.salePrice : product.variable.salePrice,
        type: product.type,
        quantity: isSimple
          ? product.simple.quantity
          : product.variable.quantity,
        unit: product.unit,
      },
      quantity: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(orderSlice.actions.setCart(JSON.stringify(cart)));
  };
  const handlePlusQuantity = () => {
    const quantity = product.type === "simple" ? product.simple.quantity : product.variable.quantity;
    let quantityPlus = 0;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.id) {
        quantityPlus = cart[i].quantity + 1;
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
      if (cart[i].product.id === product.id) {
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
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
      <Container className="box_shadow_card border_radius_10 product_item_order">
        <img src={product.featureImage} alt="product" />
        <div className="py-2 px-3">
          {product.type === "simple" ? (
            <>
              <div className="font16 font_family_bold">
                {currencyFormat(product.simple.salePrice)}
              </div>
              <div className="mt-2 font14 font_family_italic color_888">
                {product.name_en}
              </div>
            </>
          ) : (
            <>
              <div className="font16 font_family_bold">
                {currencyFormat(product.variable.salePrice)}
              </div>
              <div className="mt-2 font14 font_family_italic color_888">
                {product.name_en}
              </div>
            </>
          )}
        </div>
        {
          product.simple?.quantity <= 0 || product.variable?.quantity <= 0 ?
            <button className="btn bg_red font14 font_family_bold_italic">
              Sold out
            </button>
            :
            <>
              {item ? (
                <div className="button_change_quantity font_family_bold_italic font18">
                  <button onClick={handleMinusQuantity} className="btn">
                    <Icon icon="akar-icons:minus" />
                  </button>
                  {item.quantity}
                  <button onClick={handlePlusQuantity} className="btn">
                    <Icon icon="akar-icons:plus" />
                  </button>
                </div>
              ) : (
                <button onClick={handleAddToCart} className="btn button_add_to_cart">
                  <div></div>
                  <div className="font14 font_family_bold_italic">Add</div>
                  <Icon icon="akar-icons:plus" />
                </button>
              )}
            </>
        }
      </Container>
    </div>
  );
}

export default React.memo(ProductItem);
