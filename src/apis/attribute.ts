import axios from "axios";
import path from "./path";

const version = {
    v1: "/api/v1",
};
const hostname = `${path}${version.v1}/attributes`;

export const getAllAttributes = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.get(`${hostname}/list`,
            {
                headers: {
                    ...header
                }
            });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createAttribute = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.post(`${hostname}/create`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.attribute;
        else return null
    } catch (error) {
        console.log(error)
    }
}

export const deleteAttribute = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await axios.delete(`${hostname}/delete/${id}`,
            {
                headers: {
                    ...header
                }
            });
        if (result.status === 200) return result.data.attribute;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const updateAttribute = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.put(`${hostname}/edit`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.attribute;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const getAttributeByName = async (header: {}, body: {}, param: {}, name: string) => {
    try {
        const result = await axios.get(`${hostname}/detail/name/${name}`, {
            headers: {
                ...header
            }
        });
        console.log(result.data.attribute)
        if (result.status === 200) return result.data.attribute;
        else return null;
    } catch (error) {
        console.log(error)
    }
}