import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAnalytic from "../base/BaseAnalytic";
import BaseLoading2 from "../base/BaseLoading2";
import SaleHistoryChart from "../components/analytic/SaleHistoryChart";
import TablePopularProduct from "../components/analytic/TablePopularProduct";
import TableRecentOrder from "../components/analytic/TableRecentOrder";
import TableTop10Customers from "../components/analytic/TableTop10Customers";
import {
  dashboardSelector,
  isLoadingDashboardSelector,
} from "../redux/slices/orderSlice";
import { isLoginSelector } from "../redux/slices/userSlice";

function Dashboard() {
  const isLogin = useSelector(isLoginSelector);
  const isLoadingDashboard = useSelector(isLoadingDashboardSelector);
  const dashboard = useSelector(dashboardSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, isLogin);
  if (isLoadingDashboard)
    return (
      <>
        <BaseLoading2
          top="mt_40vh"
          size="icon100x100"
          justify="justify-content-center"
          display="d-flex"
          align="align-items-center"
        />
      </>
    );
  return (
    <>
      <div className="row m-0 p-0">
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={dashboard.revenue30Day}
            icon="mdi:currency-usd"
            backgroundIcon="rgb(167, 243, 208)"
            colorIcon="#047857"
            title="Total Revenue"
            extraTitle="(Last 30 Day)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={dashboard.orders30Day}
            icon="ic:outline-shopping-cart"
            backgroundIcon="#facaca"
            colorIcon="#ff6e6e"
            title="Total Order"
            extraTitle="(Last 30 Day)"
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={dashboard.todayRevenue}
            icon="uil:usd-circle"
            backgroundIcon="#ffe8b2"
            colorIcon="#ffb300"
            title="Today Revenue"
            extraTitle=""
          />
        </div>
        <div className="col-6 col-xl-3 m-0 px-2">
          <BaseAnalytic
            data={dashboard.totalUser}
            icon="la:user-check"
            backgroundIcon="rgb(147, 197, 253)"
            colorIcon="#1D4ED8"
            title="Total Users"
            extraTitle=""
          />
        </div>
      </div>
      <div className="px-2 mt-4">
        <SaleHistoryChart />
      </div>
      <div className="row m-0 p-0">
        <div className="col-12 col-lg-6 px-2 mt-4">
          <TableRecentOrder data={dashboard.recentOrders} />
        </div>
        <div className="col-12 col-lg-6 px-2 mt-4">
          <TableTop10Customers data={dashboard.top10Customers} />
        </div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-12 px-2 mt-4">
          <TablePopularProduct data={dashboard.popularProducts} />
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
