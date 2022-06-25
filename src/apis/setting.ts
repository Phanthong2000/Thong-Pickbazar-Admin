import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};
const hostname = `${version.v1}/setting`;

export const getSetting = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostname}/detail`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.setting;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const createSetting = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostname}/save`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.setting;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateSettingApi = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostname}/edit`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    console.log('result', body)
    if (result.status === 200) return result.data.setting;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
