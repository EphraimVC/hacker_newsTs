import axios from "axios";

export const getData = async (api: string) => {
    const response = await axios.get(api);
    return response.data.hits;
};
