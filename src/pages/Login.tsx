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
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">@</span>
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
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">@</span>
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

        <div className="flex gap-3 mb-4">
          <button className="flex-1 border border-gray-300 rounded-full py-2 text-sm">
            G Google
          </button>
          <button className="flex-1 bg-yellow-300 rounded-full py-2 text-sm font-medium">
            Kakao
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">
          계정이 없으신가요?{' '}
          <button type="button" onClick={() => navigate('/signup')} className="text-teal-600 font-medium">
            회원가입
          </button>
        </p>

        <p className="text-xs text-center text-gray-300 mt-3">
          🔒 SECURE DATA · 👪 PARENT APPROVED
        </p>

      </div>
    </div>
  );
}