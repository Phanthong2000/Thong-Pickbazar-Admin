import React from "react";

type Props = {
  index: number;
  handleDeleteValue: (position: number) => void;
  handleChangeValue: (text: string, index: number) => void;
  handleChangeMeta: (text: string, index: number) => void;
  value: any;
};
function AttributeValue({
  index,
  handleDeleteValue,
  handleChangeValue,
  handleChangeMeta,
  value,
}: Props) {
  return (
    <>
      {index !== 0 && <div className="divider_vertical_dashed my-4"></div>}
      <div className="row p-0 m-0 d-flex align-items-end">
        <div className="col-12 col-lg-9">
          <div className="row m-0 p-0">
            <div className="col-12 col-lg-6">
              <div className="font_family_bold_italic font14">Value</div>
              <input
                value={value.value}
                onChange={(e) => handleChangeValue(e.target.value, index)}
                className="h40_px w100_per mt-2"
                type="text"
              />
            </div>
            <div className="col-12 col-lg-6 px-2">
              <div className="font_family_bold_italic font14">Meta</div>
              <input
                onChange={(e) => handleChangeMeta(e.target.value, index)}
                value={value.meta}
                className="h40_px w100_per mt-2"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 m-0 p-0 d-flex justify-content-end">
          {index !== 0 && (
            <button
              onClick={() => handleDeleteValue(index)}
              type="button"
              className="btn btn-danger h40_px"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(AttributeValue);
