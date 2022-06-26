import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPaymentMethodsActive, getTaxForOrder } from "../apis";
import ChoosePaymentMethodItem from "../components/ChoosePaymentMethodItem";
import DeliveryScheduleItem from "../components/order/DeliveryScheduleItem";
import ModalChooseAddress from "../components/order/ModalChooseAddress";
import ModalChooseCoupon from "../components/order/ModalChooseCoupon";
import ModalChooseCustomer from "../components/order/ModalChooseCustomer";
import ModalUpdateContactNumber from "../components/order/ModalUpdateContactNumber";
import { CouponType, PaymentMethodType, UserType } from "../interfaces";
import orderSlice, { checkoutSelector, stepOrderSelector } from "../redux/slices/orderSlice";
import { settingSelector } from "../redux/slices/settingSlice";
import { AppDispatch } from "../redux/store";
import { currencyFormat } from "../utils/format";

function Checkout() {
  const stepOrder = useSelector(stepOrderSelector);
  const setting = useSelector(settingSelector);
  const checkoutString = useSelector(checkoutSelector);
  const [checkout, setCheckout] = useState<any>();
  const [modalCustomer, setModalCustomer] = useState<boolean>(false);
  const [modalContactNumber, setModalContactNumber] = useState<boolean>(false);
  const [modalAddress, setModalAddress] = useState<boolean>(false);
  const [modalCoupon, setModalCoupon] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | any>();
  const [paymentMethodChild, setPaymentMethodChild] = useState<any>();
  const [coupon, setCoupon] = useState<CouponType | any>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, data } = useQuery("getTaxForOrder", () =>
    getTaxForOrder({}, {}, {})
  );
  const getAllPaymentMethodsActiveApi = useQuery('getAllPaymentMethodsActive', () => getAllPaymentMethodsActive({}, {}, {}))
  useEffect(() => {
    if (stepOrder === 0) return navigate('/create-order')
    setCheckout(JSON.parse(localStorage.getItem("checkout") || "null"));
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [checkoutString]);
  const handleOpenModalCustomer = () => {
    setModalCustomer(true);
  };
  const handleCloseModalCustonmer = () => {
    setModalCustomer(false);
  };
  const handleChooseCustomer = (customer: UserType) => {
    const newCheckout = {
      customer,
      contactNumber: customer.phone,
      billAddress: `${customer.address.street}, ${customer.address.ward}, ${customer.address.district}, ${customer.address.city}`,
      shippingAddress: `${customer.address.street}, ${customer.address.ward}, ${customer.address.district}, ${customer.address.city}`,
      deliverySchedule: checkout
        ? checkout?.deliverySchedule
        : {
          title: "",
          description: "",
        },
    };
    localStorage.setItem("checkout", JSON.stringify(newCheckout));
    setCheckout(newCheckout);
    setModalCustomer(false);
  };
  const handleOpenModalContactNumber = () => {
    setModalContactNumber(true);
  };
  const handleCloseModalContactNumber = () => {
    setModalContactNumber(false);
  };
  const handleChooseContactNumber = (phone: string) => {
    const newCheckout = {
      customer: checkout?.customer ? checkout.customer : {},
      contactNumber: phone,
      billAddress: checkout?.billAddress ? checkout?.billAddress : "",
      shippingAddress: checkout?.shippingAddress
        ? checkout?.shippingAddress
        : "",
      deliverySchedule: checkout
        ? checkout?.deliverySchedule
        : {
          title: "",
          description: "",
        },
    };
    localStorage.setItem("checkout", JSON.stringify(newCheckout));
    setCheckout(newCheckout);
    setModalContactNumber(false);
  };
  const handleOpenModalAddress = () => {
    setModalAddress(true);
  };
  const handleCloseModalAddress = () => {
    setModalAddress(false);
  };
  const handleChooseCoupon = (coupon: CouponType) => {
    setModalCoupon(false);
    setCoupon(coupon)
  };
  const handleOpenModalCoupon = () => {
    setModalCoupon(true);
  };
  const handleCloseCoupon = () => {
    setModalCoupon(false);
  };
  const handleChooseAddress = (type: string, address: string) => {
    const newCheckout = {
      customer: checkout?.customer ? checkout.customer : {},
      contactNumber: checkout?.contactNumber ? checkout.contactNumber : "",
      billAddress: checkout?.billAddress ? checkout?.billAddress : "",
      shippingAddress: checkout?.shippingAddress
        ? checkout?.shippingAddress
        : "",
      deliverySchedule: checkout
        ? checkout?.deliverySchedule
        : {
          title: "",
          description: "",
        },
    };
    if (type === "billing") newCheckout.billAddress = address;
    else newCheckout.shippingAddress = address;
    localStorage.setItem("checkout", JSON.stringify(newCheckout));
    setCheckout(newCheckout);
    setModalAddress(false);
  };
  const handleChooseDeliverySchedule = (schedule: any) => {
    const newCheckout = {
      customer: checkout?.customer ? checkout.customer : {},
      contactNumber: checkout?.contactNumber ? checkout.contactNumber : "",
      billAddress: checkout?.billAddress ? checkout?.billAddress : "",
      shippingAddress: checkout?.shippingAddress
        ? checkout?.shippingAddress
        : "",
      deliverySchedule: {
        title: schedule.title,
        description: schedule.description,
      },
    };
    localStorage.setItem("checkout", JSON.stringify(newCheckout));
    setCheckout(newCheckout);
  };
  const getSubTotal = (): number => {
    let total = 0;
    cart.forEach((item) => (total += item.product.price * item.quantity));
    return total;
  };
  const getTax = (): number => {
    return ((data ? data.rate : 0) * getSubTotal()) / 100;
  };
  const getDiscount = (): number => {
    if (!coupon) return 0;
    if (coupon?.type === 'vnd') return coupon.amount;
    return getSubTotal() * coupon.amount / 100;
  };
  const handleChoosePaymentMethod = (paymentMethod: PaymentMethodType) => {
    setPaymentMethod(paymentMethod);
    setPaymentMethodChild(null)
  }
  const handleChoosePaymentMethodChild = (paymentMethodChild: any) => {
    setPaymentMethodChild(paymentMethodChild)
  }
  const getTotal = () => {
    return getSubTotal() + getTax() + setting.shipping.fee - getDiscount()
  }
  const checkEnablePayment = () => {
    if (checkout && checkout.customer && checkout.contactNumber && checkout.billAddress && checkout.shippingAddress && checkout.deliverySchedule.title) {
      if (paymentMethod && paymentMethod.child.length > 0 && paymentMethodChild) return false;
      else if (paymentMethod && paymentMethod.child.length === 0) return false;
      return true
    }
    return true
  }
  const goToConfirmPayment = () => {
    const products: any[] = [];
    cart.forEach((product) => {
      products.push({
        productId: product.product.id,
        price: product.product.price,
        quantity: product.quantity,
        unit: product.product.unit
      })
    })
    const order = {
      customerId: checkout.customer.id,
      phone: checkout.contactNumber,
      billAddress: checkout.billAddress,
      shippingAddress: checkout.shippingAddress,
      deliverySchedule: checkout.deliverySchedule,
      products: products,
      tax: {
        taxId: data ? data.id : '',
        rate: data ? data.rate : 0,
      },
      shipping: {
        shippingId: setting.shipping._id,
        fee: setting.shipping.fee,
      },
      coupon: {
        couponId: coupon ? coupon.id : '',
        type: coupon ? coupon.type : '',
        amount: coupon ? coupon.amount : 0,
      },
      orderStatus: 1,
      paymentMethodId: paymentMethodChild ? paymentMethodChild._id : paymentMethod.id,
      internetBankingImage: '',
      total: getTotal(),
    }
    localStorage.setItem('order', JSON.stringify(order));
    dispatch(orderSlice.actions.setStepOrder(2));
    navigate('/create-order/confirm-payment')
  }
  return (
    <>
      <div className="w100_per">
        <div className="container">
          <div className="font20 font_family_bold_italic px-4 mb-4">Checkout</div>
          <div className="row m-0 p-0">
            <div className="col-12 col-lg-8 px-4">
              <div className="bg_white box_shadow_card border_radius_3 p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                      1
                    </div>
                    <div className="font16 font_family_bold_italic ml_10px">
                      Customer
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenModalCustomer}
                      type="button"
                      className="btn color_primary font12 font_family_bold button_choose_checkout"
                    >
                      Choose Customer
                    </button>
                  </div>
                </div>
                <input
                  disabled
                  value={checkout?.customer?.name}
                  className="mt-4 h40_px w100_per"
                  placeholder="Customer"
                  type="text"
                />
              </div>
              <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                      2
                    </div>
                    <div className="font16 font_family_bold_italic ml_10px">
                      Contact Number
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenModalContactNumber}
                      className="btn color_primary font12 font_family_bold button_choose_checkout"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <input
                  value={checkout?.contactNumber}
                  disabled
                  className="mt-4 h40_px w100_per"
                  placeholder="Contact Number"
                  type="text"
                />
              </div>
              <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                      3
                    </div>
                    <div className="font16 font_family_bold_italic ml_10px">
                      Billing Address
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenModalAddress}
                      className="btn color_primary font12 font_family_bold button_choose_checkout"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <textarea
                  value={checkout?.billAddress}
                  disabled
                  placeholder="Billing address"
                  className="mt-2 w100_per"
                  rows={5}
                ></textarea>
              </div>
              <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                      4
                    </div>
                    <div className="font16 font_family_bold_italic ml_10px">
                      Shipping Address
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleOpenModalAddress}
                      className="btn color_primary font12 font_family_bold button_choose_checkout"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <textarea
                  value={checkout?.shippingAddress}
                  disabled
                  placeholder="Shipping address"
                  className="mt-2 w100_per"
                  rows={5}
                ></textarea>
              </div>
              <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                <div className="d-flex mb-4">
                  <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                    5
                  </div>
                  <div className="font16 font_family_bold_italic ml_10px">
                    Delivery Schedule
                  </div>
                </div>
                <div className="row m-0 p-0">
                  {setting?.deliverySchedule.map((item: any, index: number) => (
                    <DeliveryScheduleItem
                      current={checkout?.deliverySchedule}
                      item={item}
                      handleChoose={handleChooseDeliverySchedule}
                    />
                  ))}
                </div>
              </div>
            </div>
            {!isLoading && (
              <div className="col-12 col-lg-4">
                <div className="text-center font18 font_family_bold mt-4">
                  Your Order
                </div>
                <div className="mt-4">
                  {cart.map((item, index) => (
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div>
                        <span className="font16 font_family_bold">
                          {item.quantity}
                        </span>
                        <span className="font14 font_family_regular color_888">
                          {"  "}x {item.product.name} | {item.product.unit}
                        </span>
                      </div>
                      <div>
                        {currencyFormat(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider_vertical_solid my-4"></div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font14 font_family_regular color_888">
                    Subtotal
                  </div>
                  <div>{currencyFormat(getSubTotal())}</div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="font14 font_family_regular color_888">
                    Tax
                  </div>
                  <div>{currencyFormat(getTax())}</div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="font14 font_family_regular color_888">
                    Shipping
                  </div>
                  <div>{currencyFormat(setting.shipping.fee)}</div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="font14 font_family_regular color_888">
                    Discount
                  </div>
                  <div>{currencyFormat(getDiscount())}</div>
                </div>
                <div className="divider_vertical_solid my-4"></div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="font16 font_family_bold color_888">
                    Total
                  </div>
                  <div>{currencyFormat(getTotal())}</div>
                </div>
                <div>
                  <button
                    onClick={handleOpenModalCoupon}
                    className="btn p-0 m-0 color_primary font16 font_family_bold_italic"
                  >
                    Choose Coupon
                  </button>
                </div>
                <div className="bg_white border_radius_5 py-4 px-2 mt-4">
                  <div className="px-1 font16 font_family_bold_italic">
                    Choose Payment Method
                  </div>
                  <div className="px-1">
                    {
                      getAllPaymentMethodsActiveApi.isLoading ? <div>loadding</div>
                        : <div className="row p-0 m-0">
                          {
                            getAllPaymentMethodsActiveApi.data.map((item: PaymentMethodType, index: number) => <ChoosePaymentMethodItem handleChoose={handleChoosePaymentMethod} current={paymentMethod} paymentMethod={item} />)
                          }
                        </div>
                    }
                  </div>
                  <Collapse in={Boolean(paymentMethod?.child.length > 0)}>
                    <div className="px-1">
                      {
                        <div className="row p-0 m-0">
                          {
                            paymentMethod &&
                            paymentMethod.child.map((item: PaymentMethodType, index: number) => <ChoosePaymentMethodItem handleChoose={handleChoosePaymentMethodChild} current={paymentMethodChild} paymentMethod={item} />)
                          }
                        </div>
                      }
                    </div>
                  </Collapse>
                </div>
                <button onClick={goToConfirmPayment} disabled={checkEnablePayment()} className="btn bg_primary mt-4 color_white font16 font_family_bold_italic d-block w100_per py-2">Payment</button>
              </div>
            )}
          </div>
        </div>
      </div >
      <ModalChooseCustomer
        handleChoose={handleChooseCustomer}
        open={modalCustomer}
        handleClose={handleCloseModalCustonmer}
      />
      <ModalUpdateContactNumber
        open={modalContactNumber}
        handleChoose={handleChooseContactNumber}
        handleClose={handleCloseModalContactNumber}
      />
      <ModalChooseAddress
        open={modalAddress}
        handleChoose={handleChooseAddress}
        handleClose={handleCloseModalAddress}
      />
      <ModalChooseCoupon
        subTotal={getSubTotal()}
        handleChoose={handleChooseCoupon}
        handleClose={handleCloseCoupon}
        open={modalCoupon}
        paymentMethod={paymentMethod}
      />
    </>
  );
}

export default React.memo(Checkout);
