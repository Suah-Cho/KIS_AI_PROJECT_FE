import axios from 'axios';
import type { ChatHistoryItem } from '../type/history';

const API_BASE_URL = `http://10.98.46.91/api`

export async function sendLLMMessage(question: string, chatId: string) {
    const res = await axios.post(`${API_BASE_URL}/llm/${chatId}`, {
        question: question,
        model: "gemma3:27b",
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
