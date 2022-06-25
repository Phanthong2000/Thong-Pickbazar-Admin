import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "rsuite";
import { getAllCouponsActive } from "../../apis";
import { CouponType } from "../../interfaces";
import CouponItem from "./CouponItem";

type Props = {
  subTotal: number;
  paymentMethodId: string;
  open: boolean;
  handleClose: () => void;
  handleChoose: (coupon: any) => void;
};
function ModalChooseCoupon({
  handleChoose,
  handleClose,
  open,
  paymentMethodId,
  subTotal,
}: Props) {
  const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Array<CouponType>>([]);
  const [code, setCode] = useState<string>("");
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
  };
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
            </div>
            <div className="col-3 px-2">
              <button
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
        <div className="mt-4">
          {coupons.map((item, index) => (
            <CouponItem coupon={item} key={index} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ModalChooseCoupon);
