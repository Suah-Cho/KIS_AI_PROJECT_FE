import axios from "axios";

const BASE_URL = `http://10.98.46.91/api`

const api = axios.create({
    baseURL: "http://10.98.46.91/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export default api;