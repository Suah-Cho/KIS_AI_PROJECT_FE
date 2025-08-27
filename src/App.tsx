import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatWindow from "./components/chat/ChatWindow";
import { useChat } from "./hooks/useChat";
import Login from "./components/login/Login";

function App() {
  const { messages, sendMessage } = useChat();
  const isLoggedIn = localStorage.getItem("sessionToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={isLoggedIn ? <ChatWindow messages={messages} onSend={sendMessage} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/chat" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
