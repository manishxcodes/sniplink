import api from "@/lib/axios";

export const getAllUrls = async() => {
    const response = await api.get('/');
    return response.data;
}

export const createUrl = async(data: {title: string, targetURL: string}) => {
    const response = await api.post('/shorten', data);
    return response.data;
}

export const deleteUrl = async (shortCode: string) => {
    const response = await api.delete('/', {
        data: {shortCode}
    });
    return response.data;
}