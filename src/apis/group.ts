import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};
const hostname = `${version.v1}/groups`;
export const getAllGroups = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostname}/list`, {
      headers: {
        ...header
      }
    })
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostname}/create`,
      {
        ...body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.group;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostname}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.group;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getGroupByName = async (
  header: {},
  body: {},
  param: {},
  name: string
) => {
  try {
    const result = await fetchApi.get(`${hostname}/detail/name/${name}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.group;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateGroup = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.put(
      `${hostname}/edit`,
      {
        ...body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.group;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
