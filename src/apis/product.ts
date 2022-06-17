import axios from "axios";
import fetchApi from "./fetchApi";

const version = {
    v1: "/api/v1",
};
const hostname = `${version.v1}/products`;

export const getAllProducts = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.get(`${hostname}/list`, {
            headers: {
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.post(`${hostname}/create`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.product;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await fetchApi.delete(`${hostname}/delete/${id}`,
            {
                headers: {
                    ...header
                }
            });
        if (result.status === 200) return result.data.product;
        else return null;
    } catch (error) {
        console.log(error)
    }
}