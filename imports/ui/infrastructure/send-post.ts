import axios from 'axios';

export const sendPost: (url: string, data: {}) => Promise<boolean> = async (
    url,
    data
) => {
    try {
        const result = await axios.post(url, data);
        return result.status === 201 || result.status === 200 ? true : false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
