import { Icon } from "@iconify/react";
import React from "react";
import Select from "react-select";

type Props = {
  url?: string;
  value: any;
  handleChooseSocial: (value: any, position: number) => void;
  handleChange: (url: string, position: number) => void;
  index: number;
  handleDelete: (position: number) => void;
};
type SocialType = {
  value: {
    icon: string;
    name: string;
  };
  label: any;
  url?: string;
};
const dataSocial: Array<SocialType> = [
  {
    value: {
      icon: "ant-design:facebook-filled",
      name: "Facebook",
    },
    label: "",
  },
  {
    value: {
      icon: "ant-design:instagram-filled",
      name: "Instagram",
    },
    label: "",
  },
  {
    value: {
      icon: "ant-design:youtube-filled",
      name: "Youtube",
    },
    label: "",
  },
  {
    value: {
      icon: "ant-design:twitter-square-filled",
      name: "Twitter",
    },
    label: "",
  },
];
const option2 = dataSocial.map((item, index) => {
  item.label = (
    <div className="d-flex align-items-center">
      <Icon className="icon20x20 color_888" icon={item.value.icon} />
      <span className="ml_10px font14 font_family_bold">{item.value.name}</span>
    </div>
  );
  return item;
});
function SocialInput({
  handleChooseSocial,
  handleDelete,
  index,
  url = "test",
  handleChange,
  value,
}: Props) {
  return (
    <>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row m-0 p-0">
        <div className="col-5">
          <div className="font_family_bold_italic font14">
            Select social platform
          </div>
          <Select
            value={option2.filter((option) => option.value.name === value.name)}
            styles={{
              control: (provided, state) => ({
                ...provided,
                height: "40px",
                marginTop: "8px",
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
            placeholder="Choose parent"
            onChange={(value) => handleChooseSocial(value, index)}
            options={option2}
          />
        </div>
        <div className="col-5 px-1">
          <div className="font_family_bold_italic font14">Add profile url</div>
          <input
            value={url}
            onChange={(e) => handleChange(e.target.value, index)}
            className="mt-2 h40_px w100_per"
            placeholder="Type Url"
            type="text"
          />
        </div>
        <div className="col-2 d-flex align-items-end justify-content-end">
          {index !== 0 && (
            <button
              onClick={() => handleDelete(index)}
              className="btn btn-danger"
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(SocialInput);
