
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";

function App() {
  const { messages, sendMessage } = useChat();
  return <ChatWindow messages={messages} onSend={sendMessage} />;
}

export default App;
