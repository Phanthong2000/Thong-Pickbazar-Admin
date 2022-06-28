import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "rsuite";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import BoxProfile from "../components/BoxProfile";
import BoxCart from "../components/navbar/BoxCart";
import BoxNotification from "../components/navbar/BoxNotification";
import Logo from "../components/navbar/Logo";
import useClickOutSide from "../hooks/useClickOutside";
import { cartSelector } from "../redux/slices/orderSlice";
import { settingSelector } from "../redux/slices/settingSlice";
import { userSelector } from "../redux/slices/userSlice";
import { primaryColor, primaryHoverColor } from "../theme";

const Container = styled.div`
  height: 80px;
  position: fixed;
  border-bottom: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  z-index: 100;
  top: 0px;
  background: #fff;
  width: 100%;
`;
function Navbar() {
  const cartString = useSelector(cartSelector);
  const notificationRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const user = useSelector(userSelector);
  const setting = useSelector(settingSelector);
  const [isShowProfile, setIsProfile] = useState<boolean>(false);
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const handleShowBoxProfile = () => {
    setIsProfile(!isShowProfile);
  };
  const handleCloseProfile = () => {
    setIsProfile(false);
  };
  useClickOutSide(notificationRef, () => setIsShowNotification(false));
  useClickOutSide(cartRef, () => setIsShowCart(false));
  useEffect(() => {
    if (cartString) setCart(JSON.parse(cartString));
  }, [cartString]);
  if (!user || !setting) return null;
  return (
    <Container className="d-flex align-items-center justify-content-between px-4">
      <Logo url={setting.logo} />
      <div className="position-relative d-flex align-items-center">
        <div className="position-relative d-flex align-items-center">
          <div ref={cartRef} className="position-relative mr_20px">
            <button
              onClick={() => setIsShowCart(!isShowCart)}
              className="btn p-0"
            >
              <Badge color="green" content={cart.length}>
                <Icon
                  className="icon30x30 color_888"
                  icon="clarity:shopping-cart-solid"
                />
              </Badge>
            </button>
            <div
              className={classNames("box_cart_navbar", { show: isShowCart })}
            >
              <BoxCart cart={cart} />
            </div>
          </div>
        </div>
        <div className="position-relative mr_20px">
          <button
            onClick={() => setIsShowNotification(!isShowNotification)}
            className="btn p-0"
          >
            <Badge content={1}>
              <Icon
                className="icon30x30 color_888"
                icon="ic:baseline-notifications-active"
              />
            </Badge>
          </button>
          <div
            ref={notificationRef}
            className={classNames("box_notification", {
              show: isShowNotification,
            })}
          >
            <BoxNotification />
          </div>
        </div>
        <Avatar
          click={handleShowBoxProfile}
          cursor="pointer"
          shape="circle"
          url={user ? user.avatar : ""}
          size={50}
        />
        <BoxProfile
          user={user}
          close={handleCloseProfile}
          show={isShowProfile}
        />
      </div>
    </Container>
  );
}

export default Navbar;
