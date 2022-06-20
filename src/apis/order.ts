import axios from "axios";
import fetchApi from "./fetchApi";


const version = {
    v1: "/api/v1",
};

const hostnameStatus = `${version.v1}/order-statuses`;

export const getAllOrderStatuses = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.get(`${hostnameStatus}/list`, {
            headers: {
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createOrderStatus = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.post(`${hostnameStatus}/create`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.orderStatus;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const getOrderStatusById = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await fetchApi.get(`${hostnameStatus}/detail/${id}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.orderStatus;
    } catch (error) {
        console.log(error)
    }
}

export const updateOrderStatus = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.put(`${hostnameStatus}/edit`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.orderStatus;
        else return null;
    } catch (error) {
        console.log(error)
    }
}