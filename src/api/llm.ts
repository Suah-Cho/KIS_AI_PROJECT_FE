import type { ChatHistoryItem } from '../type/history';
import api from './axios';

const API_BASE_URL = `http://10.98.46.91/api`

export async function sendLLMMessage(question: string, chatId: string, model: string, category: string, userId: string) {
    // console.log("sendLLMMessage called with:", { question, chatId, model, category, userId });
    const res = await api.post(`${API_BASE_URL}/llm/${chatId}?user_id=${userId}`, {
        question: question,
        model: model,
        category: category
    });
    return res.data;
}

export async function getLLMMessages(chatId: string, userId: string) {
    // console.log("getLLMMessages called with:", { chatId, userId });
    const res = await api.get(`${API_BASE_URL}/llm?chat_id=${chatId}&user_id=${userId}`, {
        validateStatus: () => true,
    });
    console.log(`res: ${res}`)
    return res;
}

export async function getLLMChatList(): Promise<ChatHistoryItem[]> {
    const userId = localStorage.getItem("UserId") || "";
    const res = await api.get(`${API_BASE_URL}/llm/history?user_id=${userId}`);
    return res.data.data;
}

export async function deleteLLMChat(chatId: string, userId: string) {
    const res = await api.delete(`${API_BASE_URL}/llm/reset/${chatId}?user_id=${userId}`);
    return res.status;
}

export async function deleteLLMChatAll(userId: string) {
    const res = await api.delete(`${API_BASE_URL}/llm/reset_all?user_id=${userId}`);
    return res;
}