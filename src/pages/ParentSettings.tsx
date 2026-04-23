import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useChildren } from '../hooks/useChildren';
import { useRoutines } from '../hooks/useRoutines';

type RoutineGroup = 'morningMust' | 'morningExtra' | 'eveningMust' | 'eveningExtra';
type RoutineItem = {
  id: string;
  label: string;
  points: number;
};

const morningMustRoutines: RoutineItem[] = [
  { id: 'wake', label: '기상하기', points: 5 },
  { id: 'bed', label: '이불 개기', points: 5 },
  { id: 'wash', label: '세수하기', points: 5 },
  { id: 'brush', label: '양치하기', points: 10 },
  { id: 'dress', label: '옷 입기', points: 10 },
  { id: 'hair', label: '머리 빗기', points: 5 },
  { id: 'breakfast', label: '아침 식사하기', points: 10 },
  { id: 'handwash', label: '손 씻기', points: 5 },
  { id: 'notebook', label: '알림장 확인하기', points: 10 },
  { id: 'backpack', label: '책가방 챙기기', points: 10 },
  { id: 'slippers', label: '실내화 챙기기', points: 5 },
  { id: 'waterbottle', label: '물통 챙기기', points: 5 },
  { id: 'shoes', label: '현관 신발 정리', points: 5 },
  { id: 'vitamin', label: '비타민 먹기', points: 5 },
  { id: 'window', label: '창문 열기', points: 5 },
  { id: 'sunlight', label: '햇빛 쬐기', points: 5 },
  { id: 'stretch', label: '스트레칭하기', points: 10 },
  { id: 'weather', label: '오늘 날씨 확인하기', points: 5 },
  { id: 'homework', label: '숙제 확인하기', points: 10 },
  { id: 'supplies', label: '준비물 체크하기', points: 10 },
];

const morningExtraRoutines: RoutineItem[] = [
  { id: 'table', label: '식탁 닦기', points: 20 },
  { id: 'dishes', label: '그릇 설거지 돕기', points: 20 },
  { id: 'trash', label: '쓰레기 버리기', points: 15 },
  { id: 'laundry', label: '빨래 개기', points: 20 },
  { id: 'vacuum', label: '청소기 돌리기', points: 25 },
  { id: 'plants', label: '화분 물주기', points: 15 },
  { id: 'sweep', label: '현관 쓸기', points: 15 },
  { id: 'recycle', label: '분리수거 돕기', points: 20 },
  { id: 'fridge', label: '냉장고 정리 돕기', points: 20 },
  { id: 'ingredients', label: '식재료 꺼내기', points: 15 },
  { id: 'side', label: '반찬 나르기', points: 15 },
  { id: 'shopping', label: '장보기 돕기', points: 20 },
  { id: 'mail', label: '우편물 가져오기', points: 10 },
  { id: 'sibling', label: '동생 돌보기', points: 25 },
  { id: 'books', label: '책 정리하기', points: 15 },
  { id: 'washer', label: '세탁기 돌리기', points: 20 },
  { id: 'bathroom', label: '욕실 청소 돕기', points: 25 },
  { id: 'cooking', label: '밥 짓기 돕기', points: 20 },
  { id: 'shoes', label: '신발 정리하기', points: 10 },
  { id: 'foodwaste', label: '음식물 쓰레기 버리기', points: 15 },
];

const eveningMustRoutines: RoutineItem[] = [
  { id: 'handwash', label: '손 씻기', points: 5 },
  { id: 'homework', label: '숙제하기', points: 15 },
  { id: 'notebook', label: '알림장 쓰기', points: 10 },
  { id: 'reading', label: '책 읽기', points: 10 },
  { id: 'dinner', label: '저녁 식사하기', points: 10 },
  { id: 'brush', label: '양치하기', points: 10 },
  { id: 'bath', label: '목욕하기', points: 10 },
  { id: 'hairdry', label: '머리 말리기', points: 5 },
  { id: 'pjs', label: '잠옷 입기', points: 5 },
  { id: 'prep', label: '내일 준비물 챙기기', points: 10 },
  { id: 'backpack', label: '책가방 정리하기', points: 10 },
  { id: 'slippers', label: '실내화 넣기', points: 5 },
  { id: 'waterbottle', label: '물통 씻기', points: 5 },
  { id: 'bedtime', label: '취침 준비하기', points: 5 },
  { id: 'diary', label: '일기 쓰기', points: 15 },
  { id: 'readinglog', label: '독서록 쓰기', points: 15 },
  { id: 'stretch', label: '스트레칭하기', points: 10 },
  { id: 'reflect', label: '오늘 하루 돌아보기', points: 10 },
  { id: 'weather', label: '내일 날씨 확인하기', points: 5 },
  { id: 'gratitude', label: '감사한 일 3가지 생각하기', points: 10 },
];

const eveningExtraRoutines: RoutineItem[] = [
  { id: 'toys', label: '장난감 정리', points: 15 },
  { id: 'room', label: '방 청소하기', points: 20 },
  { id: 'desk', label: '책상 정리', points: 15 },
  { id: 'trash', label: '쓰레기통 비우기', points: 15 },
  { id: 'clothes', label: '내일 옷 준비하기', points: 10 },
  { id: 'dishes', label: '저녁 설거지 돕기', points: 20 },
  { id: 'table', label: '식탁 닦기', points: 15 },
  { id: 'chairs', label: '의자 정리', points: 10 },
  { id: 'help', label: '형제 숙제 도와주기', points: 20 },
  { id: 'massage', label: '부모님 어깨 주물러드리기', points: 20 },
  { id: 'shoes', label: '신발 정리하기', points: 10 },
  { id: 'bathroom', label: '욕실 정리하기', points: 15 },
  { id: 'laundry', label: '빨래 개기', points: 20 },
  { id: 'fridge', label: '냉장고 물 채우기', points: 10 },
  { id: 'petfood', label: '반려동물 밥 주기', points: 15 },
  { id: 'petwalk', label: '반려동물 산책 돕기', points: 20 },
  { id: 'window', label: '창문 닫기', points: 5 },
  { id: 'lights', label: '불 끄기', points: 5 },
  { id: 'curtains', label: '커튼 치기', points: 5 },
  { id: 'goodnight', label: '가족에게 잘 자요 인사하기', points: 10 },
];

const ParentSettings = () => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { children, loading: childrenLoading } = useChildren();
  const {
    routines,
    toggleRoutine,
    addRoutine,
    saveRoutineState,
  } = useRoutines(selectedChildId, true);

  useEffect(() => {
    if (!selectedChildId && children.length > 0) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const d = new Date(data.user.created_at);
        setUserInfo({
          email: data.user.email ?? '',
          createdAt: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        });
      }
    });
    const stored = localStorage.getItem('sabujakk-notifications');
    if (stored) {
      try { setNotificationState(JSON.parse(stored)); } catch {}
    }
  }, []);

  const getGroupRoutines = (group: RoutineGroup) => {
    if (!routines.length) {
      let defaults: RoutineItem[];
      if (group === 'morningMust') defaults = [...morningMustRoutines];
      else if (group === 'morningExtra') defaults = [...morningExtraRoutines];
      else if (group === 'eveningMust') defaults = [...eveningMustRoutines];
      else defaults = [...eveningExtraRoutines];
      return defaults.map(r => ({ ...r, is_active: localOverrides[r.id] ?? true }));
    }

    return routines
      .filter((routine) => {
        const isMorning = group.startsWith('morning');
        const category = group.includes('Must') ? 'must' : 'extra';
        return routine.type === (isMorning ? 'morning' : 'evening') && routine.category === category;
      })
      .map((routine) => ({
        id: routine.id,
        label: routine.name,
        points: routine.points,
        is_active: routine.is_active,
      }));
  };

  // Add custom routine form state
  const [newRoutine, setNewRoutine] = useState({
    label: '',
    points: '',
    group: 'morningMust' as RoutineGroup,
  });

  const [notificationState, setNotificationState] = useState({
    approveAlert: true,
    remindUnapproved: true,
    morningReminder: '07:30',
    eveningReminder: '20:00',
    weeklyReport: false,
  });
  const [pinLocked, setPinLocked] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ email: string; createdAt: string } | null>(null);
  const [localOverrides, setLocalOverrides] = useState<Record<string, boolean>>({});
  const [notifSaved, setNotifSaved] = useState(false);

  const handleToggle = (id: string) => {
    if (routines.length > 0) {
      toggleRoutine(id);
    } else {
      setLocalOverrides(prev => ({ ...prev, [id]: !(prev[id] ?? true) }));
    }
  };

  const handleLogout = async () => {
    setAuthError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
      return;
    }
    navigate('/');
  };

  const handleAddCustomRoutine = async () => {
    if (!selectedChildId || !newRoutine.label.trim() || !newRoutine.points.trim()) return;

    const points = parseInt(newRoutine.points, 10);
    if (isNaN(points) || points <= 0) return;

    try {
      const type = newRoutine.group.startsWith('morning') ? 'morning' : 'evening';
      const category = newRoutine.group.includes('Must') ? 'must' : 'extra';
      await addRoutine(newRoutine.label.trim(), points, type, category);
      setNewRoutine({ label: '', points: '', group: 'morningMust' });
      setSaveMessage('새 루틴이 추가되었습니다. 저장 버튼을 눌러주세요.');
    } catch (error) {
      setSaveMessage('루틴 추가 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const handleSaveRoutines = async () => {
    try {
      if (!selectedChildId) {
        setSaveMessage('자녀를 먼저 선택해주세요.');
        return;
      }
      if (routines.length === 0) {
        // DB에 루틴 없음 → 기본 루틴을 한 번에 삽입
        const allDefaults = [
          ...morningMustRoutines.map(r => ({ ...r, type: 'morning', category: 'must' })),
          ...morningExtraRoutines.map(r => ({ ...r, type: 'morning', category: 'extra' })),
          ...eveningMustRoutines.map(r => ({ ...r, type: 'evening', category: 'must' })),
          ...eveningExtraRoutines.map(r => ({ ...r, type: 'evening', category: 'extra' })),
        ];
        const toInsert = allDefaults.filter(r => localOverrides[r.id] ?? true);
        const { error } = await supabase.from('routines').insert(
          toInsert.map(r => ({
            child_id: selectedChildId,
            name: r.label,
            points: r.points,
            type: r.type,
            category: r.category,
            is_active: true,
          }))
        );
        if (error) throw error;
        setSaveMessage(`기본 루틴 ${toInsert.length}개가 저장되었습니다.`);
      } else {
        await saveRoutineState();
        setSaveMessage('루틴 설정이 저장되었습니다.');
      }
    } catch (error) {
      setSaveMessage('루틴 저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('sabujakk-notifications', JSON.stringify(notificationState));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notificationState) => {
    setNotificationState((current) => ({
      ...current,
      [key]: typeof current[key] === 'boolean' ? !current[key] : current[key],
    }));
  };

  const scrollTo = (section: string) => {
    let ref;
    switch (section) {
      case 'profile':
        ref = profileRef;
        break;
      case 'routine':
        ref = routineRef;
        break;
      case 'alert':
        ref = alertRef;
        break;
      case 'account':
        ref = accountRef;
        break;
      default:
        return;
    }
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 pb-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[32px] bg-white p-6 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold text-teal-700">사부작</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">부모 설정</h2>
              <p className="mt-2 text-sm text-slate-500">자녀 정보를 관리하고 루틴을 설정해 보세요.</p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => scrollTo('profile')}
                className="flex w-full items-center gap-3 rounded-3xl bg-teal-50 px-4 py-3 text-left text-sm font-semibold text-teal-700 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-teal-100 text-lg">👤</span>
                자녀 프로필
              </button>
              <button
                type="button"
                onClick={() => scrollTo('routine')}
                className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">📋</span>
                루틴 편집
              </button>
              <button
                type="button"
                onClick={() => scrollTo('alert')}
                className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">🔔</span>
                알림 설정
              </button>
              <button
                type="button"
                onClick={() => scrollTo('account')}
                className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">👤</span>
                계정 정보
              </button>
            </div>
          </aside>

          <main className="space-y-6">
            <section ref={profileRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">자녀 프로필 관리</p>
                  <h1 className="mt-2 text-3xl font-bold text-slate-900">자녀의 정보를 수정하거나 새 프로필을 추가할 수 있습니다.</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    아이 홈 보기
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800">
                    새 자녀 추가
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {childrenLoading ? (
                  <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm text-center py-16 text-slate-500">
                    자녀를 불러오는 중입니다.
                  </div>
                ) : children.length > 0 ? (
                  children.map((child) => (
                    <div key={child.id} className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="grid place-items-center rounded-[28px] bg-slate-100 p-8 text-4xl">🐻</div>
                      <div className="mt-6 space-y-2 text-center">
                        <p className="text-xl font-semibold text-slate-900">{child.name}</p>
                        <p className="text-sm text-slate-500">{child.age}세 · 총 {child.total_points ?? 0}P</p>
                        <button className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                          수정
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm text-center py-16 text-slate-500">
                    등록된 자녀가 없습니다.
                  </div>
                )}

                <button className="flex flex-col items-center justify-center rounded-[32px] border-dashed border-2 border-slate-300 bg-white p-8 text-center text-slate-500 transition hover:border-teal-300 hover:text-teal-700">
                  <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">+</span>
                  <p className="text-sm font-semibold">새 자녀 추가</p>
                  <p className="mt-2 text-xs text-slate-400">새로운 자녀를 등록하고 루틴을 만들어주세요.</p>
                </button>
              </div>
            </section>

            <section ref={routineRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">루틴 편집</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">자녀별 아침과 저녁 루틴을 관리하세요.</h2>
                </div>
                <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
                  {childrenLoading ? (
                    <span className="px-4 py-2 text-sm text-slate-500">자녀 불러오는 중...</span>
                  ) : children.length > 0 ? (
                    children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => setSelectedChildId(child.id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          selectedChildId === child.id ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))
                  ) : (
                    <span className="px-4 py-2 text-sm text-slate-500">자녀가 없습니다.</span>
                  )}
                </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <RoutineGroupCard
                  title="☀️ 아침 — 필수 루틴"
                  routines={getGroupRoutines('morningMust')}
                  onToggle={handleToggle}
                />
                <RoutineGroupCard
                  title="☀️ 아침 — 엑스트라"
                  routines={getGroupRoutines('morningExtra')}
                  onToggle={handleToggle}
                />
                <RoutineGroupCard
                  title="🌙 저녁 — 필수 루틴"
                  routines={getGroupRoutines('eveningMust')}
                  onToggle={handleToggle}
                />
                <RoutineGroupCard
                  title="🌙 저녁 — 엑스트라"
                  routines={getGroupRoutines('eveningExtra')}
                  onToggle={handleToggle}
                />
              </div>

              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">직접 추가</h3>
                <p className="mt-2 text-sm text-slate-500">자녀에게 맞는 새로운 루틴을 추가하세요.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">루틴 이름</label>
                    <input
                      type="text"
                      value={newRoutine.label}
                      onChange={(e) => setNewRoutine(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="예: 물 한 컵 마시기"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">포인트</label>
                    <input
                      type="number"
                      value={newRoutine.points}
                      onChange={(e) => setNewRoutine(prev => ({ ...prev, points: e.target.value }))}
                      placeholder="10"
                      min="1"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">카테고리</label>
                    <select
                      value={newRoutine.group}
                      onChange={(e) => setNewRoutine(prev => ({ ...prev, group: e.target.value as RoutineGroup }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                    >
                      <option value="morningMust">아침 필수</option>
                      <option value="morningExtra">아침 엑스트라</option>
                      <option value="eveningMust">저녁 필수</option>
                      <option value="eveningExtra">저녁 엑스트라</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddCustomRoutine}
                      disabled={!selectedChildId || !newRoutine.label.trim() || !newRoutine.points.trim()}
                      className="w-full rounded-2xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      추가하기
                    </button>
                  </div>
                </div>
              </div>

              {saveMessage ? (
                <div className="mt-4 rounded-2xl bg-emerald-100 px-4 py-3 text-sm text-emerald-800">
                  {saveMessage}
                </div>
              ) : null}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveRoutines}
                  className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  변경사항 저장
                </button>
              </div>
            </section>

            <section ref={alertRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">알림 설정</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">승인 및 리마인더 알림을 설정하세요.</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">승인 알림</h3>
                  <p className="mt-2 text-sm text-slate-500">아이 체크와 미승인 항목의 알림을 받습니다.</p>
                  <div className="mt-6 space-y-4">
                    <ToggleRow
                      label="아이 체크 시 즉시 알림"
                      enabled={notificationState.approveAlert}
                      onToggle={() => toggleNotification('approveAlert')}
                    />
                    <ToggleRow
                      label="미승인 항목 재알림"
                      enabled={notificationState.remindUnapproved}
                      onToggle={() => toggleNotification('remindUnapproved')}
                    />
                  </div>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">루틴 리마인더</h3>
                  <p className="mt-2 text-sm text-slate-500">아침, 저녁 알림 시간과 주간 리포트를 설정합니다.</p>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">아침 루틴 알림 시간</label>
                      <input
                        type="time"
                        value={notificationState.morningReminder}
                        onChange={(event) => setNotificationState((current) => ({
                          ...current,
                          morningReminder: event.target.value,
                        }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">저녁 루틴 알림 시간</label>
                      <input
                        type="time"
                        value={notificationState.eveningReminder}
                        onChange={(event) => setNotificationState((current) => ({
                          ...current,
                          eveningReminder: event.target.value,
                        }))}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <ToggleRow
                      label="주간 리포트 알림"
                      enabled={notificationState.weeklyReport}
                      onToggle={() => toggleNotification('weeklyReport')}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  {notifSaved ? '저장됨 ✓' : '저장하기'}
                </button>
              </div>
            </section>

            <section ref={accountRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">계정 정보</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">부모 계정 보호 설정을 확인하세요.</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">계정 정보</h3>
                  <dl className="mt-4 grid gap-4 text-sm text-slate-700">
                    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                      <span>이메일</span>
                      <span className="font-semibold text-slate-900">{userInfo?.email ?? '불러오는 중...'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                      <span>가입일</span>
                      <span className="font-semibold text-slate-900">{userInfo?.createdAt ?? '-'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                      <span>플랜</span>
                      <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">무료</span>
                    </div>
                  </dl>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">부모 PIN 설정</h3>
                        <p className="mt-2 text-sm text-slate-500">아이가 설정 화면에 접근하지 못하도록 보호합니다.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPinLocked((value) => !value)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          pinLocked ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {pinLocked ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      로그아웃
                    </button>
                    {authError ? <p className="text-sm text-rose-600">{authError}</p> : null}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] bg-sky-100 p-5 text-sm text-slate-700">
                부모 PIN을 설정하면 아이가 설정 화면에 열 수 없어요. 숫자 4자리로 설정해요.
              </div>
            </section>

            <section className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600">부모 설정 안내</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">자녀별로 루틴과 포인트가 완전히 독립적으로 관리됩니다.</h2>
                </div>
                <button className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                  루틴 상세 보기
                </button>
              </div>
              <div className="mt-6 rounded-[28px] bg-teal-50 p-6 text-sm text-slate-700">
                각 자녀의 연령에 맞는 맞춤형 활동을 선택할 수 있습니다.
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

function RoutineGroupCard({
  title,
  routines,
  onToggle,
}: {
  title: string;
  routines: Array<{
    id: string;
    label: string;
    points: number;
    is_active?: boolean;
  }>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-6 max-h-96 overflow-y-auto space-y-3">
        {routines.map((item) => {
          const enabled = item.is_active ?? true;
          return (
            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{item.label}</p>
                <p className="text-xs text-slate-500">{item.points}P</p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                className={`inline-flex h-8 w-16 items-center rounded-full px-1 transition ml-3 ${
                  enabled ? 'bg-teal-700' : 'bg-slate-200'
                }`}
              >
                <span className={`h-6 w-6 rounded-full bg-white shadow-sm transition ${enabled ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-sm">
      <span className="text-sm text-slate-900">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex h-10 w-20 items-center rounded-full px-1 transition ${
          enabled ? 'bg-teal-700' : 'bg-slate-200'
        }`}
      >
        <span className={`h-8 w-8 rounded-full bg-white shadow-sm transition ${enabled ? 'translate-x-10' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

export default ParentSettings;
