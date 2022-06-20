import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseTableOrderStatus from "../base/BaseTableOrderStatus";
import BoxSearchOrderStatus from "../components/order/BoxSearchOrderStatus";
import { OrderStatusType } from "../interfaces";
import { allOrderStatusesSelector } from "../redux/slices/orderSlice";

function OrderStatus() {
  const allOrderStatuses = useSelector(allOrderStatusesSelector);
  const [orderStatuses, setOrderStatuses] = useState<Array<OrderStatusType>>(
    []
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (allOrderStatuses) {
      setOrderStatuses(allOrderStatuses);
    }
  }, [allOrderStatuses]);
  const handleUpdate = (id: string) => {
    navigate(`/order-status/${id}`);
  };
  const handleFilter = (text: string) => {
    if (text) {
      setOrderStatuses(
        allOrderStatuses.filter((orderStatus: any) =>
          orderStatus.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setOrderStatuses(allOrderStatuses);
    }
  };
  return (
    <>
      <BoxSearchOrderStatus handleFilter={handleFilter} />
      <BaseTableOrderStatus handleUpdate={handleUpdate} data={orderStatuses} />
    </>
  );
}

export default React.memo(OrderStatus);
