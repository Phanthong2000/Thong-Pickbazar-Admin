import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../apis/product";
import BaseTableProduct from "../base/BaseTableProduct";
import Pagination from "../components/Pagination";
import BoxSearch from "../components/product/BoxSearch";
import { ProductType } from "../interfaces";
import productSlice, {
  allProductsSelector,
} from "../redux/slices/productSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

const countPerRow = 10;
function Product() {
  const allProducts = useSelector(allProductsSelector);
  const [products, setProducts] = useState<any[]>([]);
  const [productsByPage, setProductsByPage] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (allProducts) {
      setProducts(allProducts);
    }
  }, [allProducts]);
  useEffect(() => {
    setPage(1);
    setProductsByPage(products.slice(0, countPerRow));
  }, [products]);
  const handleDelete = (product: ProductType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteProduct({}, {}, {}, product.id);
      if (result) {
        dispatch(productSlice.actions.deleteProduct(product));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete product",
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
    console.log(name);
  };
  const handleFilter = (text: string, group: string, category: string) => {
    if (!text && !group && !category) {
      setProducts(allProducts);
    } else {
      setProducts(
        allProducts.filter((product: any) => {
          if (text && !group && !category) {
            return product.name_en.toLowerCase().includes(text.toLowerCase());
          } else if (text && group && !category) {
            return (
              product.name_en.toLowerCase().includes(text.toLowerCase()) &&
              product.group._id === group
            );
          } else if (text && group && category) {
            return (
              product.name_en.toLowerCase().includes(text.toLowerCase()) &&
              product.categories.includes(category)
            );
          } else if (!text && group && !category) {
            return product.group._id === group;
          } else if (!text && group && category) {
            return product.categories.includes(category);
          }
        })
      );
    }
  };
  const handleChoosePage = (value: any) => {
    setPage(value);
    setProductsByPage(
      products.slice(
        (value - 1) * countPerRow,
        (value - 1) * countPerRow + countPerRow
      )
    );
  };
  const handlePrevPage = (value: any) => {
    if (page > 1) {
      setProductsByPage(
        products.slice(
          (page - 2) * countPerRow,
          (page - 2) * countPerRow + countPerRow
        )
      );
      setPage(page - 1);
    }
  };
  const handleNextPage = (value: any) => {
    if (page < Math.ceil(products.length / countPerRow)) {
      setProductsByPage(
        products.slice(page * countPerRow, page * countPerRow + countPerRow)
      );
      setPage(page + 1);
    }
  };
  const handleGetEndPage = () => {
    return Math.ceil(products.length / countPerRow);
  };
  const handleGetListPageCurrent = () => {
    const end = Math.ceil(products.length / countPerRow);
    if (page < 4 || end <= 4) return [1, 2, 3, 4, end];
    else if (end - page < 4) {
      return [1, end - 3, end - 2, end - 1, end];
    } else return [page - 1, page, page + 1, page + 2];
  };
  return (
    <>
      <BoxSearch handleFilter={handleFilter} />
      <BaseTableProduct
        data={productsByPage}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <div className="d-flex align-items-center justify-content-end mt-4 pagination">
        <Pagination type="change" click={handlePrevPage} value="prev" />
        {handleGetListPageCurrent().map((item, index) => (
          <Pagination
            value={item}
            type="value"
            key={index}
            page={page}
            click={handleChoosePage}
            pageEnd={handleGetEndPage()}
          />
        ))}
        <Pagination
          status="end"
          type="value"
          page={page}
          click={handleChoosePage}
          value={handleGetEndPage()}
        />
        <Pagination type="change" click={handleNextPage} value="next" />
      </div>
    </>
  );
}

export default React.memo(Product);
