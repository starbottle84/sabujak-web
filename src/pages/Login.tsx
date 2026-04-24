import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const fromPath = (location.state as { from?: string } | null)?.from || '/home';

  const handleLogin = async () => {
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate(fromPath, { replace: true });
  };

  const handleForgotPassword = async () => {
    setForgotError(null);
    if (!forgotEmail) {
      setForgotError('이메일을 입력해주세요.');
      return;
    }

    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setForgotLoading(false);

    if (error) {
      setForgotError(error.message);
      return;
    }

    setForgotSent(true);
  };

  const handleBackToLogin = () => {
    setForgotMode(false);
    setForgotEmail('');
    setForgotSent(false);
    setForgotError(null);
  };

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 w-80">

          <button
            type="button"
            onClick={handleBackToLogin}
            className="text-gray-400 text-sm mb-4 flex items-center gap-1"
          >
            ← 로그인으로 돌아가기
          </button>

          <h2 className="text-xl font-bold text-teal-700 text-center mb-1">비밀번호 찾기</h2>
          <p className="text-xs text-gray-400 text-center mb-6">
            가입한 이메일로 재설정 링크를 보내드려요
          </p>

          {forgotSent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📬</div>
              <p className="text-sm text-gray-700 font-medium mb-2">이메일을 확인해주세요!</p>
              <p className="text-xs text-gray-400 mb-6">
                <span className="font-medium text-teal-600">{forgotEmail}</span>으로<br />
                비밀번호 재설정 링크를 보냈어요.
              </p>
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium"
              >
                로그인으로 돌아가기
              </button>
            </div>
          ) : (
            <>
              {forgotError && (
                <div className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
                  {forgotError}
                </div>
              )}

              <div className="relative mb-4">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
                  placeholder="가입한 이메일 주소"
                  className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
                className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
              >
                {forgotLoading ? '전송 중...' : '재설정 링크 보내기'}
              </button>
            </>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-80">

        <h1 className="text-3xl font-bold text-teal-700 text-center mb-1">
          사부작
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          우리 아이 루틴 & 리워드 앱
        </p>

        {errorMessage ? (
          <div className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{errorMessage}</div>
        ) : null}

        <div className="relative mb-3">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@email.com"
            className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none"
          />
        </div>

        <div className="relative mb-1">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔒</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none"
          />
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => { setForgotMode(true); setForgotEmail(email); }}
            className="text-xs text-teal-600"
          >
            비밀번호 찾기
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium mb-4 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? '로그인 중...' : '로그인 →'}
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4 flex-shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google로 계속하기
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full py-2.5 text-sm font-medium text-[#3C1E1E] transition hover:brightness-95"
            style={{ backgroundColor: '#FEE500' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#3C1E1E">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.605 1.545 4.9 3.9 6.268-.17.633-.615 2.298-.705 2.655-.11.44.162.433.338.315.138-.093 2.193-1.48 3.081-2.082.45.062.912.094 1.386.094 5.523 0 10-3.477 10-7.75C22 6.477 17.523 3 12 3z"/>
            </svg>
            카카오로 계속하기
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">
          계정이 없으신가요?{' '}
          <button type="button" onClick={() => navigate('/signup')} className="text-teal-600 font-medium">
            회원가입
          </button>
        </p>

        <p className="text-[10px] text-center text-gray-500 mt-6 tracking-wide">
          🔒 SECURE DATA · 👪 PARENT APPROVED
        </p>

      </div>
    </div>
  );
}