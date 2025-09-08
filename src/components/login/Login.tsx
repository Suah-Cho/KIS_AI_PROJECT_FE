import React, { useState } from "react";
import { Login as LoginAPI } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("로그인 시도:", { email, password });
        
        try {
            const resp = await LoginAPI(email, password);
            // console.log("로그인 성공:", resp);

            if (resp.status === 200) {
                localStorage.setItem("accessToken", resp.data.data.access_token);
                localStorage.setItem("UserId", resp.data.data.sub);
                navigate("/", { replace: true });
            } else {
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
            }
            
        } catch (error) {
            console.error("로그인 실패:", error);
            // alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

                {/* 이메일 입력 */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        이메일
                    </label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="kis@kisvan.co.kr" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        비밀번호
                    </label>
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="********" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                {/* 로그인 버튼 */}
                <button 
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400">
                    로그인
                </button>
            </form>
        </div>
        </>
    );
}