import axios from "axios";
import path from "./path";

const version = {
    v1: "/api/v1",
};
const hostname = `${path}${version.v1}/tags`;

export const getAllTags = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.get(`${hostname}/list`, {
            headers: {
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createTag = async (header: {}, body: {}, param: {}) => {
    try {
        console.log(body)
        const result = await axios.post(`${hostname}/create`, {
            ...body
        }, {
            headers: {
                "Content-Type": "application/json",
                ...header
            }
        });
        console.log(result.data.tag)
        if (result.status === 200) return result.data.tag;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const deleteTag = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await axios.delete(`${hostname}/delete/${id}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tag;
        else return null;
    } catch (error) {
        console.log(error)
    }

}

export const getTagBySlug = async (header: {}, body: {}, param: {}, slug: string) => {
    try {
        const result = await axios.get(`${hostname}/detail/slug/${slug}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tag;
        else return null;
    } catch (error) {
        console.log(error)
    }

}

export const updateTag = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.put(`${hostname}/edit`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tag;
        else return null;
    } catch (error) {
        console.log(error)
    }
}