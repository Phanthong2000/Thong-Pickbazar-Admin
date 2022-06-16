import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxCart from "../components/cart/BoxCart";
import BoxSearchCreateOrder from "../components/order/BoxSearchCreateOrder";
import DrawerCart from "../components/order/DrawerCart";
import ProductItem from "../components/order/ProductItem";
import Pagination from "../components/Pagination";
import { cartSelector } from "../redux/slices/orderSlice";
import { allProductsSelector } from "../redux/slices/productSlice";
import { AppDispatch } from "../redux/store";

const countPerRow = 8;
function CreateOrder() {
  const allProducts = useSelector(allProductsSelector);
  const cartString = useSelector(cartSelector);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
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
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [cartString]);
  useEffect(() => {
    setPage(1);
    setProductsByPage(products.slice(0, countPerRow));
  }, [products]);
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
  const handleDrawerCart = (status: boolean) => {
    setShowCart(status);
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
      console.log("first");
      return [1, end - 3, end - 2, end - 1, end];
    } else return [page - 1, page, page + 1, page + 2];
  };
  return (
    <>
      <div className="px-2">
        <BoxSearchCreateOrder handleFilter={handleFilter} />
      </div>
      <div className="row m-0 p-0 mt-4">
        {productsByPage.map((item, index) => (
          <ProductItem cart={cart} product={item} key={index} />
        ))}
      </div>
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
      <BoxCart handleDrawerCart={handleDrawerCart} />
      <DrawerCart isShow={showCart} handleDrawer={handleDrawerCart} />
    </>
  );
}

export default React.memo(CreateOrder);
