import axios from 'axios';
import path from './path';

const version = {
    v1: '/api/v1'
}
const hostname = `${path}${version.v1}/groups`;

export const getAllGroups = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.get(`${hostname}/list`, {
            headers: {
                ...header
            },
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createGroup = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.post(`${hostname}/create`, {
            ...body
        }, {
            headers: {
                "Content-Type": "application/json",
                ...header
            }
        });
        if (result.status === 200) return result.data.group;
        else return null
    } catch (error) {
        console.log(error)
    }
}

export const deleteGroup = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await axios.delete(`${hostname}/delete/${id}`, {
            headers: {
                ...header
            }
        });
        if(result.status === 200) return result.data.group;
        else return null;
    } catch (error) {
        console.log(error)
    }
}