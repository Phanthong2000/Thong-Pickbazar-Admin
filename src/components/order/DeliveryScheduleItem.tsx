import React from "react";

type Props = {
  current: any;
  item: any;
  handleChoose: (item: any) => void;
};
function DeliveryScheduleItem({ current, item, handleChoose }: Props) {
  return (
    <div className="col-6 col-lg-4 p-2 m-0">
      <div
        onClick={() => handleChoose(item)}
        className={`p-3 cursor_pointer border_radius_5 ${current?.title === item?.title && current
          ? `bg_white outline_primary_1px`
          : `bg_gray`
          }`}
      >
        <div className="font14 font_family_bold_italic">{item.title}</div>
        <div className="font14 font_family_regular mt-2">
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default React.memo(DeliveryScheduleItem);
