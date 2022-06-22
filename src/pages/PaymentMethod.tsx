import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePaymentMethod, updateStatusPaymentStatus } from "../apis";
import BaseTablePaymentMethod from "../base/BaseTablePaymentMethod";
import BoxSearchPaymentMethod from "../components/order/BoxSearchPaymentMethod";
import { PaymentMethodType } from "../interfaces";
import orderSlice, {
  allPaymentMethodsSelector,
  getApiAllPaymentMethods,
} from "../redux/slices/orderSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function PaymentMethod() {
  const allPaymentMethods = useSelector(allPaymentMethodsSelector);
  const [paymentMethods, setPaymentMethods] = useState<
    Array<PaymentMethodType>
  >([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deletePaymentMethod({}, {}, {}, id);
      if (result) {
        dispatch(getApiAllPaymentMethods());
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete category",
          })
        );
      }
    };
    alert2(
      "Delete",
      "question",
      true,
      "Delete",
      "#f55858",
      true,
      "Cancel",
      "#000",
      "Delete",
      "Are you sure, you want to delete?",
      handleConfirm
    );
  };
  const handleUpdate = (id: string) => {
    navigate(`/payment-methods/${id}`);
  };
  const handleChangeStatus = async (id: string, status: string) => {
    try {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await updateStatusPaymentStatus(
        {},
        { status: status },
        {},
        id
      );
      if (result) {
        dispatch(getApiAllPaymentMethods());
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update status Payment Method",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (text: string) => {
    if (text) {
      setPaymentMethods(
        allPaymentMethods.filter(
          (paymentMethod: any) =>
            paymentMethod.name.toLowerCase().includes(text.toLowerCase()) &&
            paymentMethod.type === "parent"
        )
      );
    } else {
      setPaymentMethods(allPaymentMethods);
    }
  };
  useEffect(() => {
    if (allPaymentMethods) setPaymentMethods(allPaymentMethods);
  }, [allPaymentMethods]);
  return (
    <>
      <BoxSearchPaymentMethod handleFilter={handleFilter} />
      <BaseTablePaymentMethod
        data={paymentMethods}
        handleChangeStatus={handleChangeStatus}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default React.memo(PaymentMethod);
