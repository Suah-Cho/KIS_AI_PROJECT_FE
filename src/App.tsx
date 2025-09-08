import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatWindow from "./components/chat/ChatWindow";
import Login from "./components/login/Login";
import { Toaster } from "react-hot-toast";

function App() {
  // console.log(!!localStorage.getItem("accessToken"))
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={isLoggedIn ? <ChatWindow /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          duration: 4500,
          style: {
            background: "rgba(30,34,42,0.88)",
            color: "#f1f5f9",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "18px",
            padding: "14px 18px",
            boxShadow: "0 6px 28px -6px rgba(0,0,0,0.55)",
            fontSize: "0.95rem",
            lineHeight: "1.35",
            minWidth: "320px",
            maxWidth: "420px"
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#0f172a"
            }
          },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#0f172a"
              }
            }
        }}
      />
    </>
  );
}

export default App;
