import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAnalytic from "../base/BaseAnalytic";
import { isLoginSelector } from "../redux/slices/userSlice";

function Dashboard() {
  const isLogin = useSelector(isLoginSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, isLogin);
  return (
    <>
      <div className="row m-0 p-0">
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={1231212}
            icon="mdi:currency-usd"
            backgroundIcon="rgb(167, 243, 208)"
            colorIcon="#047857"
            title="Total Revenue"
            extraTitle="(Last 30 Day)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={1231212}
            icon="ic:outline-shopping-cart"
            backgroundIcon="#facaca"
            colorIcon="#ff6e6e"
            title="Total Order"
            extraTitle="(Last 30 Day)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={1231212}
            icon="uil:usd-circle"
            backgroundIcon="#ffe8b2"
            colorIcon="#ffb300"
            title="Todays Revenue"
            extraTitle=""
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={1231212}
            icon="la:user-check"
            backgroundIcon="rgb(147, 197, 253)"
            colorIcon="#1D4ED8"
            title="Total Users"
            extraTitle=""
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
