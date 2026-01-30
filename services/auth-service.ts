import api from "@/lib/axios";

interface SignupData {
    firstname: string,
    lastname: string,
    email: string, 
    password: string
}

export const signup = async (data: SignupData, verificationToken: string) => {
    const response = await api.post(
        '/api/v1/user/signup',
        data,
        {
            headers: {
                "x-verification-token": verificationToken
            }
        }
    );
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