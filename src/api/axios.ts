import axios from "axios";

const api = axios.create({
    baseURL: "https://http://10.98.46.91/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export default api;