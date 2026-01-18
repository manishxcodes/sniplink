import api from "@/lib/axios";

export const signup = async (data: {
    firstname: string,
    lastname: string,
    email: string, 
    password: string
}) => {
    const response = await api.post('/api/v1/user/signup', data);
    return response.data;
}

export const signin = async (data: {
    email: string, 
    password: string,
}) => {
    const response = await api.post('/api/v1/user/signin', data);
    return response.data;
}

export const getAuthStatus = async() => {
    const response = await api.get('/api/v1/user/me');
    return response.data;
}

export const signout = async() => {
    const response = await api.post('/api/v1/user/signout');
    return response.data;
}