import api from './axios';

const API_BASE_URL = `http://10.98.46.91/api`

export async function Login(username: string, password: string) {
    console.log("Login POST :", { username, password });

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const res = await api.post(
        `${API_BASE_URL}/auth/login`,
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    return res;
}


export async function LogOut(accessToken: string) {
    console.log(`GET Logout with token: ${accessToken}`);
    const res = await api.get(`${API_BASE_URL}/auth/logout`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return res;
}
