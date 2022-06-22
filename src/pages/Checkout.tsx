import React from "react";

function Checkout() {
  return (
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
                  <button className="btn color_primary font12 font_family_bold button_choose_checkout">Choose Customer</button>
                </div>
              </div>
              <input
                className="mt-4 h40_px w100_per"
                placeholder="Customer"
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
  )
}

export default Checkout;
