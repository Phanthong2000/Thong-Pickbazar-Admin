import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

function BoxSearch() {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const handleShowFilter = () => {
    setIsFilter(!isFilter);
  };
  return (
    <div className="box_shadow_card bg_white p-4 border_radius_3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="font_family_bold font20">Products</div>
        <div className="d-flex align-items-center justify-content-end">
          <button
            onClick={handleShowFilter}
            className="d-flex align-items-center btn color_primary font_family_bold_italic font16"
          >
            <span>Filter</span>
            <Icon
              className={classNames(
                "icon20x20 ml_5px",
                { show: isFilter },
                "icon_down_product"
              )}
              icon="akar-icons:arrow-down"
            />
          </button>
          <Link to="/products/create">
            <button className="btn bg_primary color_white font14 font_family_bold h40_px ml_10px">
              + Add product
            </button>
          </Link>
        </div>
      </div>
      <div className={classNames({ show: isFilter }, "box_filter_product")}>
        <div className="divider_vertical_dashed"></div>
        <div className="mt-4">
          <div className="row p-0 m-0">
            <div className="col-12 col-lg-6 px-2">
              <div className="font_14 font_family_bold_italic mb-2">
                Filter by Group
              </div>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: "40px",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#ddd",
                    primary50: "#ddd",
                    primary: "rgba(0,159,127)",
                  },
                })}
                isClearable
                placeholder="Filter by Group"
              />
            </div>
            <div className="col-12 col-lg-6 px-2">
              <div className="font_14 font_family_bold_italic mb-2">
                Filter by Category
              </div>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: "40px",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#ddd",
                    primary50: "#ddd",
                    primary: "rgba(0,159,127)",
                  },
                })}
                isClearable
                placeholder="Filter by Category"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BoxSearch);
