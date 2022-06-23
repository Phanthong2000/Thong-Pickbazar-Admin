import React, { useState } from "react";
import ModalChooseCustomer from "../components/order/ModalChooseCustomer";
import ModalUpdateContactNumber from "../components/order/ModalUpdateContactNumber";
import { UserType } from "../interfaces";

function Checkout() {
  const [customer, setCustomer] = useState<UserType>()
  const [modalCustomer, setModalCustomer] = useState<boolean>(false);
  const [modalContactNumber, setModalContactNumber] = useState<boolean>(false);
  const handleOpenModalCustomer = () => {
    setModalCustomer(true)
  }
  const handleCloseModalCustonmer = () => {
    setModalCustomer(false)
  }
  const handleChooseCustomer = (customer: UserType) => {
    setCustomer(customer);
    setModalCustomer(false)
  }
  const handleOpenModalContactNumber = () => {
    setModalContactNumber(true)
  }
  const handleCloseModalContactNumber = () => {
    setModalContactNumber(false)
  }
  const handleChooseContactNumber = (phone: string) => {
    // setCustomer(customer);
    setModalContactNumber(false)
  }
  return (
    <>
      <div className="w100_per">
        <div className="container">
          <div className="row m-0 p-0">
            <div className="col-12 col-lg-8 px-4">
              <div className="bg_white box_shadow_card border_radius_3 p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                      1
                    </div>
                    <div className="font16 font_family_bold_italic ml_10px">Customer</div>
                  </div>
                  <div>
                    <button onClick={handleOpenModalCustomer} type="button" className="btn color_primary font12 font_family_bold button_choose_checkout">Choose Customer</button>
                  </div>
                </div>
                <input
                  disabled
                  value={customer?.name}
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
                    <div className="font16 font_family_bold_italic ml_10px">Contact Number</div>
                  </div>
                  <div>
                    <button onClick={handleOpenModalContactNumber} className="btn color_primary font12 font_family_bold button_choose_checkout">Update</button>
                  </div>
                </div>
                <input
                  disabled
                  className="mt-4 h40_px w100_per"
                  placeholder="Contact Number"
                  type="text"
                />
              </div>

            </div>
            <div className="col-12 col-lg-4">
              2
            </div>
          </div>
        </div>
      </div>
      <ModalChooseCustomer handleChoose={handleChooseCustomer} open={modalCustomer} handleClose={handleCloseModalCustonmer} />
      <ModalUpdateContactNumber open={modalContactNumber} handleChoose={handleChooseContactNumber} handleClose={handleCloseModalContactNumber} />
    </>

  )
}

export default React.memo(Checkout);
