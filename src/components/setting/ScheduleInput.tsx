import React from "react";

type Props = {
  title: string;
  description: string;
  handleChange: (title: string, description: string, position: number) => void;
  index: number;
  handleDelete: (position: number) => void;
};

function ScheduleInput({
  title,
  description,
  handleChange,
  handleDelete,
  index,
}: Props) {
  return (
    <>
      {index !== 0 && <div className="my-4 divider_vertical_dashed"></div>}
      <div className="row m-0 p-0">
        <div className="col-9">
          <div className="font_family_bold_italic font14">Title/Time</div>
          <input
            value={title}
            onChange={(e) => handleChange(e.target.value, description, index)}
            className="mt-2 h40_px w100_per"
            placeholder="Type Title/Time"
            type="text"
          />
        </div>
        <div className="col-3 d-flex align-items-end justify-content-end">
          {index !== 0 && (
            <button
              onClick={() => handleDelete(index)}
              type="button"
              className="btn btn-danger"
            >
              Remove
            </button>
          )}
        </div>
        <div className="col-12">
          <div className="font_family_bold_italic font14 mt-4">Description</div>
          <textarea
            value={description}
            onChange={(e) => handleChange(title, e.target.value, index)}
            className="mt-2 w100_per"
            rows={5}
            placeholder="Type Description"
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default React.memo(ScheduleInput);
