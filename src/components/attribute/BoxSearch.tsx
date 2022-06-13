import React from "react";
import { Link } from "react-router-dom";

function BoxSearch() {
  return (
    <div className="d-flex align-items-center justify-content-between box_shadow_card bg_white p-4 border_radius_3">
      <div className="font_family_bold font20">Attributes</div>
      <div className="d-flex align-items-center justify-content-end">
        <Link to="/attributes/create">
          <button className="btn bg_primary color_white font14 font_family_bold h40_px">
            + Add Attribute
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BoxSearch;
