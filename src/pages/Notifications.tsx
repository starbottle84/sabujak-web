import { Sidebar, TopBar, BottomNav } from '../components/SharedLayout';

const notifications = [
  { title: '오늘 양치 완료!', message: '지우가 오늘 루틴을 모두 완료했어요.', time: '1시간 전' },
  { title: '새로운 목표 추가', message: '민우에게 목표 “책 10쪽 읽기”가 추가되었습니다.', time: '3시간 전' },
  { title: '보너스 포인트 지급', message: '오늘 추가 보상 15PT가 적립되었습니다.', time: '어제' },
];

export default function Notifications() {
  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar activeTab="notifications" />
      <div className="flex-1 flex flex-col pb-20 md:pb-0 h-screen overflow-y-auto">
        <TopBar title="알림" />
        <main className="flex-1 px-8 py-6 max-w-4xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold font-headline text-on-surface">알림 센터</h1>
            <p className="text-on-surface-variant mt-2">자녀의 루틴 진행과 보상 알림을 확인하세요.</p>
          </div>
          <div className="space-y-4">
            {notifications.map((item) => (
              <article key={item.title} className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container-highest hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="font-bold text-on-surface text-lg">{item.title}</h2>
                    <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{item.message}</p>
                  </div>
                  <span className="text-xs text-on-surface-variant">{item.time}</span>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
