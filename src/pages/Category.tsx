import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../apis/category";
import BaseTableCategory from "../base/BaseTableCategory";
import BoxSearch from "../components/category/BoxSearch";
import { CategoryType } from "../interfaces";
import categorySlice, {
  allCategoriesSelector,
  getApiAllCategories,
} from "../redux/slices/categorySlice";
import groupSlice from "../redux/slices/groupSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Category() {
  const allCategories = useSelector(allCategoriesSelector);
  const [categories, setCategories] = useState<Array<any>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    setCategories(allCategories);
  }, [allCategories]);
  // const handleSearch = (value) => {
  //     if (text) {
  //         setCategories(allCategories.filter((category: any) => category.name_en.toLowerCase().includes(text.toLowerCase())))
  //     } else {
  //         setCategories(allCategories)
  //     }
  // }
  const handleFilter = (value: any, text: string) => {
    if (value) {
      setCategories(
        allCategories.filter(
          (category: any) =>
            category.name_en.toLowerCase().includes(text.toLowerCase()) &&
            category.group.name_en === value.value
        )
      );
    } else {
      setCategories(
        allCategories.filter((category: any) =>
          category.name_en.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };
  const handleDelete = (category: CategoryType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      console.log("row", category);
      const result = await deleteCategory({}, {}, {}, category._id);
      console.log("réult", result);
      if (result) {
        dispatch(getApiAllCategories());
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
    navigate(`/categories/${id}`);
  };
  return (
    <>
      <BoxSearch handleFilter={handleFilter} />
      <BaseTableCategory
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        data={categories}
      />
    </>
  );
}

export default React.memo(Category);
