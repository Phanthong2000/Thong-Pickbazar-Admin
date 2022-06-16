import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { getAllCategoriesByGroup } from "../../apis/category";
import { allGroupsSelector } from "../../redux/slices/groupSlice";

type Props = {
  handleFilter: (text: string, group: string, category: string) => void;
};
function BoxSearchCreateOrder({ handleFilter }: Props) {
  const allGroups = useSelector(allGroupsSelector);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const [options2, setOptions2] = useState<any[]>([]);
  const [groupId, setGroupId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  useEffect(() => {
    if (allGroups) {
      const data: any[] = [];
      allGroups.forEach((group: any) => {
        data.push({
          value: group.id,
          label: group.name_en,
        });
      });
      setOptions(data);
    }
  }, [allGroups]);
  const handleShowFilter = () => {
    setIsFilter(!isFilter);
  };
  const handleChooseGroup = (value: any) => {
    if (value) {
      setGroupId(value.value);
      handleGetCategoriesByGroup(value.value);
      handleFilter(text, value.value, "");
    } else {
      setGroupId("");
      setOptions2([]);
      handleFilter(text, "", "");
    }
  };
  const handleGetCategoriesByGroup = async (id: string) => {
    const result = await getAllCategoriesByGroup({}, {}, {}, id);
    if (result) {
      const options = [] as any[];
      result.forEach((category: any) => {
        options.push({
          value: category.id,
          label: category.name_en,
        });
      });
      setOptions2(options);
    } else {
      console.log("cc");
    }
  };
  const handleChooseCategory = (value: any) => {
    if (value) {
      setCategoryId(value.value);
      handleFilter(text, groupId, value.value);
    } else {
      setCategoryId("");
      handleFilter(text, groupId, "");
    }
  };
  return (
    <div className="box_shadow_card bg_white p-4 border_radius_3">
      <div className="row p-0 m-0 d-flex align-items-center">
        <div className="col-12 col-lg-3">
          <div className="font_family_bold font20">Create Order</div>
        </div>
        <div className="col-12 col-lg-9">
          <div className="row m-0 p-0">
            <div className="col-6 col-lg-10">
              <input
                onChange={(e) => {
                  handleFilter(e.target.value, groupId, categoryId);
                  setText(e.target.value);
                }}
                placeholder="Type your query and press enter"
                className="h40_px mr_10px w100_per"
                type="text"
              />
            </div>
            <div className="col-6 col-lg-2 d-flex justify-content-end">
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
            </div>
          </div>
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
                onChange={(value) => handleChooseGroup(value)}
                options={options}
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
                onChange={(value) => handleChooseCategory(value)}
                placeholder="Filter by Category"
                options={options2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxSearchCreateOrder;
