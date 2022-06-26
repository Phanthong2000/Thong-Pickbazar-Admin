import React from 'react'
import { PaymentMethodType } from '../interfaces';

type Props = {
    paymentMethod: PaymentMethodType | any;
    current: PaymentMethodType | any;
    handleChoose: (paymentMethod: PaymentMethodType) => void
}
function ChoosePaymentMethodItem({ current, paymentMethod, handleChoose }: Props) {
    const handleClick = () => {
        handleChoose(paymentMethod)
    }
    return (
        <div className={`col-4 px-1 mt-2`}>
            <div onClick={handleClick} className={`d-flex align-items-center h100_per py-4 text-center cursor_pointer ${(current?.id && current?.id === paymentMethod?.id) || (current?._id && current?._id === paymentMethod?._id) ? `bg_white outline_primary_1px` : `bg_gray`} font14 font_family_bold_italic w100_per justify-content-center border_radius_3`}>
                {paymentMethod.name}
            </div>
        </div >
    )
}

export default React.memo(ChoosePaymentMethodItem);