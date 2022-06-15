import axios from "axios";
import path from "./path";

const version = {
    v1: "/api/v1",
};
const hostname = `${path}${version.v1}/products`;

export const getAllProducts = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.get(`${hostname}/list`, {
            headers: {
                ...header
            }
        });
        return result.data.products
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.post(`${hostname}/create`, {
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