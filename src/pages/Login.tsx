import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-80">

        <h1 className="text-3xl font-bold text-teal-700 text-center mb-1">
          사부작
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          우리 아이 루틴 & 리워드 앱
        </p>

        <div className="relative mb-3">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">@</span>
          <input
            type="email"
            placeholder="parent@email.com"
            className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none"
          />
        </div>

        <div className="relative mb-1">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔒</span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none"
          />
        </div>

        <div className="text-right mb-4">
          <button className="text-xs text-teal-600">비밀번호 찾기</button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium mb-4"
        >
          로그인 →
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex gap-3 mb-4">
          <button className="flex-1 border border-gray-300 rounded-full py-2 text-sm">
            G Google
          </button>
          <button className="flex-1 bg-yellow-300 rounded-full py-2 text-sm font-medium">
            Kakao
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">
          계정이 없으신가요?{" "}
          <span className="text-teal-600 font-medium cursor-pointer">회원가입</span>
        </p>

        <p className="text-xs text-center text-gray-300 mt-3">
          🔒 SECURE DATA · 👪 PARENT APPROVED
        </p>

      </div>
    </div>
  );
}