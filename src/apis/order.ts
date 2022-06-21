import axios from "axios";
import fetchApi from "./fetchApi";


const version = {
    v1: "/api/v1",
};

const hostnameStatus = `${version.v1}/order-statuses`;
const hostnameCoupon = `${version.v1}/coupons`;
const hostnameTax = `${version.v1}/taxes`

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

export const getAllCoupons = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.get(`${hostnameCoupon}/list`, {
            headers: {
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createCoupon = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.post(`${hostnameCoupon}/create`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.coupon;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCoupon = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await fetchApi.delete(`${hostnameCoupon}/delete/${id}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.coupon;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const updateCoupon = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.put(`${hostnameCoupon}/edit`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        console.log(result.data)
        if (result.status === 200) return result.data.coupon;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const getCouponByCode = async (header: {}, body: {}, param: {}, code: string) => {
    try {
        const result = await fetchApi.get(`${hostnameCoupon}/detail/code/${code}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.coupon;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const getAllTaxes = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.get(`${hostnameTax}/list`, {
            headers: {
                ...header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createTax = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.post(`${hostnameTax}/create`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tax;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const updateStatusTax = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await fetchApi.put(`${hostnameTax}/edit/${id}`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tax;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const deleteTax = async (header: {}, body: {}, param: {}, id: string) => {
    try {
        const result = await fetchApi.delete(`${hostnameTax}/delete/${id}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tax;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const updateTax = async (header: {}, body: {}, param: {}) => {
    try {
        const result = await fetchApi.put(`${hostnameTax}/edit`, {
            ...body
        }, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tax;
        else return null;
    } catch (error) {
        console.log(error)
    }
}

export const getTaxByName = async (header: {}, body: {}, param: {}, name: string) => {
    try {
        const result = await fetchApi.get(`${hostnameTax}/detail/name/${name}`, {
            headers: {
                ...header
            }
        });
        if (result.status === 200) return result.data.tax;
        else return null;
    } catch (error) {
        console.log(error)
    }
}