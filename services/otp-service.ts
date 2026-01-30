import api from "@/lib/axios";

export const requestOtp = async (data: {
    email: string
}) => {
    const response = await api.post('/api/v1/otp/send', data);
    return response.data;
}

export const verifyOtp = async (data: {
    email: string,
    otp: string
}) => {
    const response = await api.post('/api/v1/otp/verify', data);
    return response.data;
}