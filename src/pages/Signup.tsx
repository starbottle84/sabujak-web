import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async () => {
    setMessage(null);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않아요.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('비밀번호는 6자리 이상이어야 해요.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setMessage('가입 완료! 이메일을 확인해주세요.');
    } catch (err) {
      setErrorMessage('오류가 발생했어요. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-2">회원가입</h1>
        <p className="text-sm text-slate-500 text-center mb-6">이메일과 비밀번호로 새 계정을 만드세요.</p>

        {message ? (
          <div className="mb-4 rounded-2xl bg-emerald-100 px-4 py-3 text-sm text-emerald-700">{message}</div>
        ) : null}
        {errorMessage ? (
          <div className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{errorMessage}</div>
        ) : null}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-gray-100 px-4 py-3 text-sm outline-none"
              placeholder="parent@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-gray-100 px-4 py-3 text-sm outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-gray-100 px-4 py-3 text-sm outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignup}
          className="mt-6 w-full rounded-full bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          회원가입
        </button>

        <div className="mt-5 text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{' '}
          <button type="button" onClick={() => navigate('/')} className="text-teal-600 font-semibold">
            로그인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
