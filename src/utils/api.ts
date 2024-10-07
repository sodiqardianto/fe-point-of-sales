import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchDataApi = async (url: string, params: string | undefined) => {
    try {
        const { data } = await axios.get(BASE_URL + url, { params });
        return data;
    } catch (error) {
        console.log(error);
    }
}