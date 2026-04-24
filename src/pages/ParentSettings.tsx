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

const ROUTINE_EMOJIS: Record<string, string> = {
  wake:'⏰', bed:'🛌', wash:'🧼', brush:'🦷', dress:'👕', hair:'💇',
  breakfast:'🥣', handwash:'👏', notebook:'📒', backpack:'🎒',
  slippers:'👟', waterbottle:'💧', shoes:'👞', vitamin:'💊',
  window:'🌅', sunlight:'☀️', stretch:'🤸', weather:'🌤️',
  homework:'📝', supplies:'✅',
  table:'🍽️', dishes:'🍳', trash:'🗑️', laundry:'👚', vacuum:'🧹',
  plants:'🌿', sweep:'🧹', recycle:'♻️', fridge:'🧊', ingredients:'🥬',
  side:'🥗', shopping:'🛒', mail:'📬', sibling:'👶', books:'📚',
  washer:'💦', bathroom:'🚿', cooking:'🥘', foodwaste:'🗑️',
  dinner:'🍽️', bath:'🛁', hairdry:'💨', pjs:'🌙', prep:'✅',
  bedtime:'🌙', diary:'📔', readinglog:'📖', reflect:'💭', gratitude:'🙏',
  reading:'📖', toys:'🧸', room:'🏠', desk:'🗂️', clothes:'👔', help:'🤝',
  massage:'💆', petfood:'🐾', petwalk:'🦮', lights:'💡', curtains:'🏠',
  goodnight:'👋', chairs:'🪑',
};

const ParentSettings = () => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { children, loading: childrenLoading, addChild } = useChildren();
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
      return defaults.map(r => ({
        ...r,
        is_active: localOverrides[r.id] ?? true,
        points: localPointOverrides[r.id] ?? r.points,
      }));
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
        points: localPointOverrides[routine.id] ?? routine.points,
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
  const [pointsConfirm, setPointsConfirm] = useState<{ childId: string; action: 'reset' | 'disburse' } | null>(null);
  const [pointsLoading, setPointsLoading] = useState(false);
  const [pointsMessage, setPointsMessage] = useState<string | null>(null);
  const [childAvatarOverrides, setChildAvatarOverrides] = useState<Record<string, string>>({});
  const [editAvatarFor, setEditAvatarFor] = useState<string | null>(null);
  const [localPointOverrides, setLocalPointOverrides] = useState<Record<string, number>>({});
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildForm, setNewChildForm] = useState<{
    lastName: string;
    firstName: string;
    gender: 'boy' | 'girl';
    photo: string | null;
    birthday: string;
  }>({ lastName: '', firstName: '', gender: 'boy', photo: null, birthday: '' });
  const [addChildLoading, setAddChildLoading] = useState(false);

  const executePointsAction = async () => {
    if (!pointsConfirm) return;
    setPointsLoading(true);
    const { childId, action } = pointsConfirm;
    const child = children.find(c => c.id === childId);
    const currentPoints = child?.total_points ?? 0;
    const { error } = await supabase.from('children').update({ total_points: 0 }).eq('id', childId);
    setPointsLoading(false);
    setPointsConfirm(null);
    if (error) {
      setPointsMessage('오류가 발생했습니다: ' + error.message);
    } else if (action === 'disburse') {
      setPointsMessage(`${child?.name ?? '자녀'}에게 ${(currentPoints * 10).toLocaleString('ko-KR')}원 용돈이 지급되었습니다. 포인트가 0으로 리셋됩니다.`);
    } else {
      setPointsMessage(`${child?.name ?? '자녀'}의 포인트가 0으로 리셋되었습니다.`);
    }
    setTimeout(() => setPointsMessage(null), 4000);
  };

  const handleAvatarSelect = async (childId: string, value: string) => {
    setChildAvatarOverrides(prev => ({ ...prev, [childId]: value }));
    setEditAvatarFor(null);
    await supabase.from('children').update({ avatar: value }).eq('id', childId);
  };

  const handlePhotoUpload = (childId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await handleAvatarSelect(childId, base64);
    };
    reader.readAsDataURL(file);
  };

  const getAvatarDisplay = (child: { id: string; avatar?: string | null }) => {
    const avatar = childAvatarOverrides[child.id] ?? child.avatar;
    if (!avatar || avatar === 'boy') return { type: 'emoji', value: '🧒' };
    if (avatar === 'girl') return { type: 'emoji', value: '👧' };
    if (avatar.startsWith('data:') || avatar.startsWith('http')) return { type: 'img', value: avatar };
    return { type: 'emoji', value: '🐻' };
  };

  const handleAddChild = async () => {
    if (!newChildForm.firstName.trim()) return;
    setAddChildLoading(true);
    try {
      const fullName = `${newChildForm.lastName}${newChildForm.firstName}`.trim();
      const avatar = newChildForm.photo ?? newChildForm.gender;
      await addChild(fullName, 8, avatar, newChildForm.birthday || null);
      setNewChildForm({ lastName: '', firstName: '', gender: 'boy', photo: null, birthday: '' });
      setShowAddChild(false);
    } catch (e) { console.error(e); }
    setAddChildLoading(false);
  };

  const handleNewChildPhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setNewChildForm(prev => ({ ...prev, photo: e.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handlePointsChange = (id: string, delta: number) => {
    const baseItem = [
      ...morningMustRoutines, ...morningExtraRoutines,
      ...eveningMustRoutines, ...eveningExtraRoutines,
    ].find(r => r.id === id);
    const dbRoutine = routines.find(r => r.id === id);
    const base = localPointOverrides[id] ?? dbRoutine?.points ?? baseItem?.points ?? 5;
    setLocalPointOverrides(prev => ({ ...prev, [id]: Math.max(1, base + delta) }));
  };

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
            points: localPointOverrides[r.id] ?? r.points,
            type: r.type,
            category: r.category,
            is_active: true,
          }))
        );
        if (error) throw error;
        setSaveMessage(`기본 루틴 ${toInsert.length}개가 저장되었습니다.`);
      } else {
        await saveRoutineState();
        // 포인트 변경사항 저장
        for (const [id, pts] of Object.entries(localPointOverrides)) {
          await supabase.from('routines').update({ points: pts }).eq('id', id);
        }
        setSaveMessage('사부작거리 설정이 저장되었습니다.');
      }
      setLocalPointOverrides({});
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
      case 'points':
        ref = pointsRef;
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
                사부작거리
              </button>
              <button
                type="button"
                onClick={() => scrollTo('points')}
                className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">💰</span>
                포인트 관리
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
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  아이 홈 보기
                </button>
              </div>

              {childrenLoading ? (
                <div className="mt-8 py-12 text-center text-sm text-slate-500">자녀를 불러오는 중입니다...</div>
              ) : (
                <div className={`mt-8 grid gap-5 ${children.length > 0 ? 'sm:grid-cols-2 xl:grid-cols-3' : ''}`}>
                  {children.map((child) => {
                    const av = getAvatarDisplay(child);
                    return (
                      <div key={child.id} className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="relative grid place-items-center rounded-[28px] bg-slate-100 p-8">
                          {av.type === 'img' ? (
                            <img src={av.value} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
                          ) : (
                            <span className="text-6xl">{av.value}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => setEditAvatarFor(editAvatarFor === child.id ? null : child.id)}
                            className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow text-sm"
                          >
                            ✏️
                          </button>
                        </div>

                        {editAvatarFor === child.id && (
                          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                            <p className="text-xs font-semibold text-slate-500 text-center">캐릭터 선택</p>
                            <div className="flex gap-2 justify-center">
                              <button type="button" onClick={() => handleAvatarSelect(child.id, 'boy')}
                                className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-2xl hover:border-teal-400">
                                🧒<span className="text-xs text-slate-500">남자</span>
                              </button>
                              <button type="button" onClick={() => handleAvatarSelect(child.id, 'girl')}
                                className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-2xl hover:border-teal-400">
                                👧<span className="text-xs text-slate-500">여자</span>
                              </button>
                              <label className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-2xl cursor-pointer hover:border-teal-400">
                                📷<span className="text-xs text-slate-500">사진</span>
                                <input type="file" accept="image/*" className="hidden"
                                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(child.id, f); }} />
                              </label>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 space-y-1 text-center">
                          <p className="text-xl font-semibold text-slate-900">{child.name}</p>
                          {child.birthday && (
                            <p className="text-xs text-teal-600 font-medium">
                              {(() => {
                                const days = Math.floor((Date.now() - new Date(child.birthday!).getTime()) / 86400000);
                                return `태어난 지 ${days.toLocaleString('ko-KR')}일`;
                              })()}
                            </p>
                          )}
                          <p className="text-sm text-slate-500">총 {child.total_points ?? 0}P</p>
                        </div>
                      </div>
                    );
                  })}

                  {showAddChild ? (
                    <div className="rounded-[32px] border-2 border-teal-300 bg-teal-50 p-6 space-y-4">
                      <p className="text-sm font-bold text-teal-700 text-center">새 자녀 추가</p>

                      {/* 아바타 미리보기 */}
                      <div className="grid place-items-center rounded-[24px] bg-white py-6">
                        {newChildForm.photo ? (
                          <img src={newChildForm.photo} alt="preview" className="h-20 w-20 rounded-full object-cover" />
                        ) : (
                          <span className="text-6xl">{newChildForm.gender === 'boy' ? '🧒' : '👧'}</span>
                        )}
                      </div>

                      {/* 성별 선택 */}
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setNewChildForm(p => ({ ...p, gender: 'boy', photo: null }))}
                          className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition ${newChildForm.gender === 'boy' && !newChildForm.photo ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                          🧒 남자아이
                        </button>
                        <button type="button" onClick={() => setNewChildForm(p => ({ ...p, gender: 'girl', photo: null }))}
                          className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition ${newChildForm.gender === 'girl' && !newChildForm.photo ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                          👧 여자아이
                        </button>
                      </div>

                      {/* 사진 업로드 */}
                      <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white py-3 text-sm text-slate-500 hover:border-teal-400">
                        📷 사진 업로드
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleNewChildPhoto(f); }} />
                      </label>

                      {/* 성 + 이름 */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newChildForm.lastName}
                          onChange={(e) => setNewChildForm(p => ({ ...p, lastName: e.target.value }))}
                          placeholder="성"
                          className="w-20 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-400"
                        />
                        <input
                          type="text"
                          value={newChildForm.firstName}
                          onChange={(e) => setNewChildForm(p => ({ ...p, firstName: e.target.value }))}
                          placeholder="이름"
                          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-400"
                        />
                      </div>

                      {/* 생년월일 */}
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-500">생년월일</label>
                        <input
                          type="date"
                          value={newChildForm.birthday}
                          onChange={(e) => setNewChildForm(p => ({ ...p, birthday: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-400"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button type="button" onClick={handleAddChild}
                          disabled={!newChildForm.firstName.trim() || addChildLoading}
                          className="flex-1 rounded-full bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50">
                          {addChildLoading ? '추가 중...' : '추가하기'}
                        </button>
                        <button type="button" onClick={() => setShowAddChild(false)}
                          className="flex-1 rounded-full bg-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300">
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowAddChild(true)}
                      className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 transition hover:border-teal-300 hover:text-teal-700">
                      <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">+</span>
                      <p className="text-sm font-semibold">새 자녀 추가</p>
                      <p className="mt-2 text-xs text-slate-400">새로운 자녀를 등록하고 루틴을 만들어주세요.</p>
                    </button>
                  )}
                </div>
              )}
            </section>

            <section ref={routineRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">사부작거리</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">자녀의 아침 저녁 사부작거리를 관리하세요!</h2>
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
                <RoutineGroupCard title="☀️ 아침 사부작거리" routines={getGroupRoutines('morningMust')} onToggle={handleToggle} onPointsChange={handlePointsChange} />
                <RoutineGroupCard title="☀️ 아침 용돈거리" routines={getGroupRoutines('morningExtra')} onToggle={handleToggle} onPointsChange={handlePointsChange} />
                <RoutineGroupCard title="🌙 저녁 사부작거리" routines={getGroupRoutines('eveningMust')} onToggle={handleToggle} onPointsChange={handlePointsChange} />
                <RoutineGroupCard title="🌙 저녁 용돈거리" routines={getGroupRoutines('eveningExtra')} onToggle={handleToggle} onPointsChange={handlePointsChange} />
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

            <section ref={pointsRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-semibold text-teal-700">포인트 관리</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">용돈을 지급하거나 포인트를 리셋할 수 있습니다.</h2>
                <p className="mt-1 text-sm text-slate-500">포인트 1P = 10원으로 계산됩니다.</p>
              </div>

              {pointsMessage && (
                <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{pointsMessage}</div>
              )}

              {childrenLoading ? (
                <p className="text-sm text-slate-500">자녀 정보를 불러오는 중...</p>
              ) : children.length === 0 ? (
                <p className="text-sm text-slate-500">등록된 자녀가 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {children.map(child => (
                    <div key={child.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{child.name}</p>
                          <p className="text-sm text-slate-500">
                            현재 <span className="font-bold text-teal-700">{(child.total_points ?? 0).toLocaleString('ko-KR')}P</span>
                            {' '}· 용돈 환산{' '}
                            <span className="font-bold text-amber-600">{((child.total_points ?? 0) * 10).toLocaleString('ko-KR')}원</span>
                          </p>
                        </div>

                        {pointsConfirm?.childId === child.id ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-slate-700 text-center">
                              {pointsConfirm.action === 'disburse'
                                ? `${((child.total_points ?? 0) * 10).toLocaleString('ko-KR')}원을 지급하고 포인트를 0으로 리셋할까요?`
                                : '포인트를 0으로 리셋할까요?'}
                            </p>
                            <div className="flex gap-2 justify-center">
                              <button
                                type="button"
                                onClick={executePointsAction}
                                disabled={pointsLoading}
                                className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60"
                              >
                                {pointsLoading ? '처리 중...' : '확인'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setPointsConfirm(null)}
                                className="rounded-full bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setPointsConfirm({ childId: child.id, action: 'disburse' })}
                              disabled={(child.total_points ?? 0) === 0}
                              className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              💸 용돈 지급 후 리셋
                            </button>
                            <button
                              type="button"
                              onClick={() => setPointsConfirm({ childId: child.id, action: 'reset' })}
                              disabled={(child.total_points ?? 0) === 0}
                              className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              🔄 포인트만 리셋
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section ref={alertRef} className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">알림 설정</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">승인 및 리마인더 알림을 설정하세요.</h2>
                </div>
              </div>

              <div className="mt-8">
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
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">부모 PIN 설정</h3>
                    <p className="mt-1 text-sm text-slate-500">아이가 설정 화면에 접근하지 못하도록 보호합니다.</p>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">PIN 잠금</p>
                      <p className="text-xs text-slate-400 mt-0.5">숫자 4자리로 설정해요</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPinLocked((v) => !v)}
                      className={`inline-flex h-10 w-20 items-center rounded-full px-1 transition ${
                        pinLocked ? 'bg-teal-700' : 'bg-slate-200'
                      }`}
                    >
                      <span className={`h-8 w-8 rounded-full bg-white shadow-sm transition-transform ${pinLocked ? 'translate-x-10' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl border border-rose-200 bg-rose-50 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                  >
                    로그아웃
                  </button>
                  {authError && <p className="text-sm text-rose-600">{authError}</p>}
                </div>
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
  onPointsChange,
}: {
  title: string;
  routines: Array<{ id: string; label: string; points: number; is_active?: boolean }>;
  onToggle: (id: string) => void;
  onPointsChange: (id: string, delta: number) => void;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
        {routines.map((item) => {
          const enabled = item.is_active ?? true;
          const emoji = ROUTINE_EMOJIS[item.id] ?? '✅';
          return (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition select-none ${
                enabled
                  ? 'border-teal-300 bg-white shadow-sm'
                  : 'border-slate-200 bg-slate-100 opacity-50'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <p className="text-xs font-medium leading-tight text-slate-800 line-clamp-2">{item.label}</p>
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => onPointsChange(item.id, -1)}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-300"
                >
                  −
                </button>
                <span className="min-w-[2.5rem] text-center text-xs font-bold text-teal-700">
                  {item.points}P
                </span>
                <button
                  type="button"
                  onClick={() => onPointsChange(item.id, 1)}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-300"
                >
                  +
                </button>
              </div>
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
