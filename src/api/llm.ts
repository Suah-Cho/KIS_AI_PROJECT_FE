import type { ChatHistoryItem } from '../type/history';
import api from './axios';

const API_BASE_URL = `http://10.98.46.91/api`

export async function sendLLMMessage(question: string, chatId: string, model: string, category: string) {
    console.log("sendLLMMessage called with:", { question, chatId, model, category });
    const res = await api.post(`${API_BASE_URL}/llm/${chatId}`, {
        question: question,
        model: model,
    });
    return res.data;
}

export async function getLLMMessages(chatId: string) {
    const res = await api.get(`${API_BASE_URL}/llm?chat_id=${chatId}`, {
        validateStatus: () => true,
    });
    return res;
}

export async function getLLMChatList(): Promise<ChatHistoryItem[]> {
    const res = await api.get(`${API_BASE_URL}/llm/history`);
    return res.data.data;
}

export async function deleteLLMChat(chatId: string) {
    const res = await api.delete(`${API_BASE_URL}/llm/reset/${chatId}`);
    return res.status;
}