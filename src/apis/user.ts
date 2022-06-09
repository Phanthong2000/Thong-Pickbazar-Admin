import axios from 'axios';
// import { UserType } from '../interfaces';
import path from './path';

const version = {
    v1: '/api/v1'
}
const hostname = `${path}${version.v1}/customers`;

export const getAllUsers = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.get(`${hostname}/list`, {
            headers: {
                ...header
            },
        });
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.post(`${hostname}/create`, {
            ...body
        }, {
            headers: {
                "Content-Type": "application/json",
                ...header
            }
        });
        if (result.status === 200) return result.data.user
        else return null
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await axios.delete(`${hostname}/delete/${id}`);
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const login = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await axios.post(`${hostname}/login`, body, {
            headers: {
                "Content-Type": "application/json",
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}