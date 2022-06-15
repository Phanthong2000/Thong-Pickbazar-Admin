import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { allAttributesSelector } from "../../redux/slices/attributeSlice";

type Props = {
  index: number;
  option: any;
  handleDeleteOption: (index: number) => void;
  attributeChosen: any[];
  handleChooseName: (value: any, index: number) => void;
  handleChooseValues: (values: any[], index: number) => void;
};
function Option({
  index,
  option,
  handleDeleteOption,
  attributeChosen,
  handleChooseName,
  handleChooseValues,
}: Props) {
  const allAttributes = useSelector(allAttributesSelector);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  //   const [values, setValues] = useState<any[]>([]);
  useEffect(() => {
    if (allAttributes) {
      const data: any[] = [];
      allAttributes.forEach((attribute: any) => {
        data.push({
          value: attribute.id,
          label: attribute.name_en,
        });
      });
      setAttributes(data);
    }
  }, [allAttributes]);
  const handleChooseOptionName = (value: any, index: number) => {
    handleChooseName(value, index);
    // const data: any[] = [];
    // allAttributes.forEach((attribute: any) => {
    //   if (attribute.id === value.value) {
    //     attribute.values.forEach((value: any) => {
    //       data.push({
    //         value: {
    //           value: value.value,
    //           meta: value.meta,
    //         },
    //         label: value.value,
    //       });
    //     });
    //   }
    // });
    // setValues([]);
    // setOptions(data);
  };
  const checkOptions = () => {
    const data: any[] = [];
    if (option.attributeId) {
      allAttributes.forEach((attribute: any) => {
        if (attribute.id === option.attributeId) {
          attribute.values.forEach((value: any) => {
            data.push({
              value: {
                value: value.value,
                meta: value.meta,
              },
              label: value.value,
            });
          });
        }
      });
    }
    return data;
  };
  const handleChooseOptionValue = (value: any, index: number) => {
    // setValues(value);
    const values = [] as any[];
    value.forEach((item: any) => {
      values.push({
        value: item.value.value,
        meta: item.value.meta,
      });
    });
    handleChooseValues(values, index);
  };
  const checkAttributeChosen = () => {
    const data = [] as any[];
    allAttributes.forEach((attribute: any) => {
      if (
        attributeChosen.filter((item) => item.attributeId === attribute.id)
          .length === 0
      )
        data.push({
          value: attribute.id,
          label: attribute.name_en,
        });
    });
    return data;
  };
  const checkValues = () => {
    const data: any[] = [];
    checkOptions().forEach((item) => {
      option.values.forEach((chosen: any) => {
        if (chosen.value === item.value.value) {
          data.push(item);
        }
      });
    });
    return data;
  };
  const checkDisable = (input: any) => {
    let flag = false;
    option.values.forEach((item: any) => {
      if (item.value === input.value.value) flag = true;
    });
    return flag;
  };
  if (!attributes) return null;
  return (
    <>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="d-flex align-items-center justify-content-between">
        <span className="font14 font_family_bold_italic">
          Option {index + 1}
        </span>
        {index !== 0 && (
          <button
            onClick={() => handleDeleteOption(index)}
            type="button"
            className="btn btn-danger h40_px"
          >
            Remove
          </button>
        )}
      </div>
      <div className="row p-0 m-0">
        <div className="col-12 col-lg-4">
          <div className="font14 font_family_bold_italic mt-4">
            Attribute Name
          </div>
          <Select
            value={attributes.filter((item: any) => {
              return item.value === option.attributeId;
            })}
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
            placeholder="Choose attribute name"
            onChange={(value) => handleChooseOptionName(value, index)}
            options={checkAttributeChosen()}
          />
        </div>
        <div className="col-12 col-lg-8 px-2">
          <div className="font14 font_family_bold_italic mt-4">
            Attribute Value
          </div>
          <Select
            value={checkValues()}
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
            isOptionDisabled={(option) => checkDisable(option)}
            isMulti
            placeholder="Choose attribute value"
            onChange={(value) => handleChooseOptionValue(value, index)}
            options={checkOptions()}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(Option);
