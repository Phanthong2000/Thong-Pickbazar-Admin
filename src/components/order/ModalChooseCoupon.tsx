import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "rsuite";
import { getAllCouponsActive } from "../../apis";
import { CouponType, PaymentMethodType } from "../../interfaces";
import CouponItem from "./CouponItem";

type Props = {
  subTotal: number;
  paymentMethod: PaymentMethodType;
  open: boolean;
  handleClose: () => void;
  handleChoose: (coupon: any) => void;
};
function ModalChooseCoupon({
  handleChoose,
  handleClose,
  open,
  paymentMethod,
  subTotal = 0,
}: Props) {
  const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Array<CouponType>>([]);
  const [code, setCode] = useState<string>("");
  const [isShowNotFound, setIsShowNotFound] = useState<boolean>(false)
  const getCoupons = async () => {
    try {
      const result = await getAllCouponsActive({}, {}, {});
      setCoupons(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCoupons();
  }, []);
  const handleClearInput = () => {
    setCode("");
    setIsShowNotFound(false)
    getCoupons();
  };
  const checkQuantityCoupon = () => {
    if (coupons.length <= 1) return `${coupons.length} coupon`;
    return `${coupons.length} coupons`;
  }
  const handleSearchCoupon = () => {
    const data = coupons.filter((coupon) => coupon.code === code);
    if (data.length === 0) setIsShowNotFound(true)
    else {
      setIsShowNotFound(false)
      setCoupons(data);
    }
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title className="font20 font_family_bold">
          Choose Coupon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bg_gray">
          <div className="row m-0 px-2 py-4 d-flex align-items-center">
            <div className="col-2 font14 font_family_regular">Code Coupon</div>
            <div className="col-7 p-0 position-relative d-flex align-items-center">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Type Code Coupon"
                className="w100_per h40_px"
              />
              {code && (
                <button
                  onClick={handleClearInput}
                  className="btn p-0 m-0 position-absolute right10 d-flex align-items-center"
                >
                  <Icon icon="ci:off-close" className="icon20x20 color_888" />
                </button>
              )}
              <div className={`position-absolute bg_red p-2 bottom0 coupon_code_not_found top0 w100_per font14 d-flex align-items-center ${isShowNotFound && 'show'}`}>
                <button className="btn color_red p-0 m-0">
                  <Icon icon="ant-design:close-circle-outlined" className="icon20x20" />
                </button>
                <div className="ml_10px color_red text-center font14">
                  Coupon code not found
                </div>
              </div>
            </div>
            <div className="col-3 px-2">
              <button onClick={handleSearchCoupon}
                disabled={Boolean(!code)}
                type="button"
                className="btn px-4 btn-light border_black_1px h40_px font14 font_family_regular"
              >
                {isLoadingApply ? (
                  <Icon
                    icon="eos-icons:loading"
                    className="icon20x20 color_888"
                  />
                ) : (
                  `Apply`
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="font16 font_family_bold">Coupons</div>
          <div className="font14 font_family_regular">{checkQuantityCoupon()}</div>
        </div>
        <div className="mt-2 box_coupon_modal_choose_coupon">
          {coupons.map((item, index) => (
            <CouponItem handleChoose={handleChoose} subTotal={subTotal} paymentMethod={paymentMethod} coupon={item} key={index} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ModalChooseCoupon);
