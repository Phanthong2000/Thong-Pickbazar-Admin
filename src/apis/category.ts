import axios from "axios";
import fetchApi from "./fetchApi";


const version = {
  v1: "/api/v1",
};
const hostname = `${version.v1}/categories`;

export const getAllCategories = async (header: {}, body: {}, param: {}) => {
  try {
    const result = await fetchApi.get(`${hostname}/list`, {
      headers: {
        ...header,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (header: {}, body: {}, param: {}) => {
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
    if (result.status === 200) return result.data.category;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (
  header: {},
  body: {},
  param: {},
  id: string
) => {
  try {
    console.log(id);
    const result = await fetchApi.delete(`${hostname}/delete/${id}`, {
      headers: {
        ...header,
      },
    });
    if (result.status === 200) return result.data.category;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (
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
    if (result.status === 200) return result.data.category;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (header: {}, body: {}, param: {}) => {
  console.log(body);
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
    if (result.status === 200) return result.data.category;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategoriesByGroup = async (header: {}, body: {}, param: {}, groupId: string) => {
  try {
    const result = await fetchApi.get(`${hostname}/detail/groupId/${groupId}`, {
      headers: {
        ...header
      }
    });
    if (result.status === 200) return result.data.categories;
    else return null;
  } catch (error) {
    console.log(error)
  }
}
