import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
  v1: "/api/v1",
};
const hostname = `${version.v1}/users`;

export const getAllUsers = async (header: {}, body: {}, param: {}) => {
  try {
    const id = JSON.parse(sessionStorage.getItem("user") || "").id;
    const result = await fetchApi.get(`${hostname}/list/${id}`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.post(
      `${hostname}/create/customer`,
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
    if (result.status === 200) return result.data;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.delete(`${hostname}/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  header: {},
  body: {},
  param: {}) => {
  try {
    const result = await fetchApi.put(`${hostname}/edit`, {
      ...body
    }, {
      headers: {
        ...header
      }
    });
    if (result.status === 200) return result.data.user;
    else return null;
  } catch (error) {
    console.log(error)
  }
}

export const updateStatusUser = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.put(
      `${hostname}/edit/${id}`,
      {
        ...body,
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (result.status === 200) return result.data.user;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    const result = await fetchApi.get(`${hostname}/detail/${id}`, {
      headers: {
        ...header,
      },
    });
    return result.data.user;
  } catch (error) {
    console.log(error);
  }
};

// export const login = async (header: {}, body: {}, param: {}) => {
//     try {
//         const result = await axios.post(`${hostname}/login`, body, {
//             headers: {
//                 "Content-Type": "application/json",
//                 ...header
//             }
//         });
//         return result.data;
//     } catch (error) {
//         console.log(error)
//     }
// }
