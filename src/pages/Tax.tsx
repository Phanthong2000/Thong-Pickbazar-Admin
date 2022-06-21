import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTax, updateStatusTax } from "../apis";
import BaseTableTax from "../base/BaseTableTax";
import BoxSearchTax from "../components/order/BoxSearchTax";
import { TaxType } from "../interfaces";
import orderSlice, { allTaxesSelector } from "../redux/slices/orderSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Tax() {
  const allTaxes = useSelector(allTaxesSelector);
  const [taxes, setTaxes] = useState<Array<TaxType>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (allTaxes) setTaxes(allTaxes);
  }, [allTaxes]);
  const handleDelete = (tax: TaxType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteTax({}, {}, {}, tax.id);
      if (result) {
        dispatch(orderSlice.actions.deleteTax(tax));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete group",
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
  const handleUpdate = (name: string) => {
    navigate(`/taxes/${name}`);
  };
  const handleChangeStatus = async (tax: any) => {
    dispatch(
      themeSlice.actions.showBackdrop({
        isShow: true,
        content: "",
      })
    );
    try {
      const result = await updateStatusTax(
        {},
        { status: tax.status },
        {},
        tax.id
      );
      if (result) {
        dispatch(orderSlice.actions.updateTax(tax));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update Status Tax",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (text: string) => {
    if (!text) {
      setTaxes(allTaxes);
    } else {
      setTaxes(
        allTaxes.filter((tax: any) =>
          tax.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <BoxSearchTax handleFilter={handleFilter} />
      <BaseTableTax
        data={taxes}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleChangeStatus={handleChangeStatus}
      />
    </>
  );
}

export default Tax;
