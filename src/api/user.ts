import api from './axios';

const API_BASE_URL = `http://10.98.46.91/api`

export async function GetUserInfo(userId: string) {
    console.log("Get User Info :", { userId });

    const res = await api.get(
        `${API_BASE_URL}/users/${userId}`
    );
    return res;
}
