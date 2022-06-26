import moment from "moment";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import useClickOutSide from "../../hooks/useClickOutside";
import { CouponType, PaymentMethodType } from "../../interfaces";
import { currencyFormat } from "../../utils/format";

type Props = {
  coupon: CouponType;
  subTotal?: number;
  paymentMethod?: PaymentMethodType;
  handleChoose: (coupon: CouponType) => void;
};
const Container = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 5px;
  display: flex;
  justify-content: space-between
`
function CouponItem({ coupon, subTotal = 0, paymentMethod, handleChoose }: Props) {
  const conditionRef = useRef<HTMLDivElement>(null)
  const [isShowCondition, setIsShowCondition] = useState<boolean>(false);
  useClickOutSide(conditionRef, () => setIsShowCondition(false))
  const checkCondition = () => {
    if (coupon.condition === 'total') {
      if (coupon.minTotal < subTotal) return true;
      return false;
    }
    else if (coupon.condition === 'paymentMethod') {
      if (coupon.paymentMethodId === paymentMethod?.id) return true;
      return false
    }
    return true
  }
  return (
    <div className="p-2 w100_per">
      <Container className={`box_shadow_card ${checkCondition() ? `bg_white` : `bg_ddd`}`}>
        <div className="d-flex">
          <img className="icon100x100 border_radius_5" src={coupon.image} alt="code coupon" />
          <div className="ml_20px d-flex flex-column justify-content-center">
            <div className="font16 font_family_bold">{coupon.code}</div>
            <div className="outline_primary_1px py-1 px-3 border_radius_5 mt-2 color_primary font14 font_family_bold">
              {
                coupon && coupon?.type === 'vnd' ? `${currencyFormat(coupon.amount | 0)}` : `${coupon.amount} %`
              }
            </div>
            <div className="mt-2 font12 font_family_bold">Expire: {moment(coupon.to).format(`DD.MM.YYYY`)}</div>
          </div>
        </div>
        <div className="d-flex align-items-end flex-column justify-content-between">
          {
            checkCondition() ? <button onClick={() => handleChoose(coupon)} className="btn font14 font_family-regular color_orange">Apply {'>'}</button> : <div></div>
          }
          <div className="position-relative">
            <button onClick={() => setIsShowCondition(!isShowCondition)} className="btn color_primary font14 font_family-regular">Condition</button>
            <div ref={conditionRef} className={`position-absolute right0 bottom0 box_condition_choose_coupon box_shadow_card font14 font_family_regular ${isShowCondition && `show`}`}>
              {
                (coupon.condition === 'all') ? `For all orders`
                  :
                  (coupon.condition === 'total') ? `For orders greater ${currencyFormat(coupon.minTotal)}`
                    :
                    `For orders have payment method is ${coupon.paymentMethod[0].name}`
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CouponItem;
