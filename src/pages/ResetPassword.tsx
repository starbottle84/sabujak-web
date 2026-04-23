import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Supabase redirects with tokens in the URL hash; wait for session to be set
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setError(null);
    if (!password || !confirm) {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 해요.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않아요.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-80">

        <h2 className="text-xl font-bold text-teal-700 text-center mb-1">새 비밀번호 설정</h2>
        <p className="text-xs text-gray-400 text-center mb-6">
          사용할 새 비밀번호를 입력해주세요
        </p>

        {done ? (
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-sm text-gray-700 font-medium mb-2">비밀번호가 변경됐어요!</p>
            <p className="text-xs text-gray-400 mb-6">새 비밀번호로 로그인해주세요.</p>
            <button
              type="button"
              onClick={() => navigate('/', { replace: true })}
              className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium"
            >
              로그인하러 가기
            </button>
          </div>
        ) : (
          <>
            {!sessionReady && (
              <div className="mb-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
                링크를 통해 접속해주세요. 이메일의 재설정 링크를 클릭하면 이 페이지가 활성화돼요.
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <div className="relative mb-3">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="새 비밀번호 (6자 이상)"
                disabled={!sessionReady}
                className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none disabled:opacity-50"
              />
            </div>

            <div className="relative mb-5">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔒</span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleReset()}
                placeholder="비밀번호 확인"
                disabled={!sessionReady}
                className="w-full bg-gray-100 rounded-full py-2.5 pl-8 pr-4 text-sm outline-none disabled:opacity-50"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading || !sessionReady}
              className="w-full bg-teal-700 text-white rounded-full py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '변경 중...' : '비밀번호 변경하기'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-xs text-gray-400 mt-3 text-center"
            >
              로그인으로 돌아가기
            </button>
          </>
        )}

      </div>
    </div>
  );
}
