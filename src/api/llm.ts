import axios from 'axios';
import type { ChatHistoryItem } from '../type/history';

const API_BASE_URL = `http://10.98.46.91/api`

export async function sendLLMMessage(question: string, chatId: string, model: string) {
    const res = await axios.post(`${API_BASE_URL}/llm/${chatId}`, {
        question: question,
        model: model,
    });
    return res.data;
}

export async function getLLMMessages(chatId: string) {
    const res = await axios.get(`${API_BASE_URL}/llm?chat_id=${chatId}`);
    return res.data;
}

export async function getLLMChatList(): Promise<ChatHistoryItem[]> {
    const res = await axios.get(`${API_BASE_URL}/llm/history`);
    return res.data.data;
}


export async function deleteLLMChat(chatId: string) {
    const res = await axios.delete(`${API_BASE_URL}/llm/reset/${chatId}`);
    return res.status;
}