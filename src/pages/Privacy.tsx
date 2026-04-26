import { useNavigate } from 'react-router-dom';

const EFFECTIVE_DATE = '2026년 5월 1일';
const SERVICE_NAME = '사부작';
const CONTACT_EMAIL = 'contact@sabujakk.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm space-y-3">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="space-y-2 text-sm text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6 pb-12">
      <div className="mx-auto max-w-3xl space-y-4">

        <header className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            ← 뒤로가기
          </button>
          <p className="text-sm font-semibold text-teal-700">{SERVICE_NAME}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">개인정보처리방침</h1>
          <p className="mt-2 text-xs text-slate-400">시행일: {EFFECTIVE_DATE}</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            '{SERVICE_NAME}'(이하 "서비스")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보보호법」 및 관련 법령을 준수합니다.
            본 방침은 서비스가 수집하는 개인정보의 항목, 목적, 보유 기간, 이용자의 권리 등을 안내합니다.
          </p>
        </header>

        <Section title="1. 수집하는 개인정보 항목">
          <p className="font-semibold text-slate-800">부모/보호자 계정</p>
          <div className="space-y-2">
            <Item label="필수" value="이메일 주소 (회원가입 및 로그인용)" />
            <Item label="자동 수집" value="서비스 이용 기록, 접속 일시 (Supabase 인증 서버 기록)" />
          </div>
          <p className="font-semibold text-slate-800 mt-3">자녀 프로필 (부모가 직접 입력)</p>
          <div className="space-y-2">
            <Item label="필수" value="자녀 이름 (성, 이름)" />
            <Item label="선택" value="생년월일, 프로필 사진 (업로드 시 기기 저장)" />
          </div>
          <p className="font-semibold text-slate-800 mt-3">서비스 이용 데이터</p>
          <div className="space-y-2">
            <Item label="자동 생성" value="루틴 체크 기록, 획득 포인트 내역" />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            * 민감정보(주민등록번호, 금융정보 등)는 일절 수집하지 않습니다.
          </p>
        </Section>

        <Section title="2. 개인정보 수집·이용 목적">
          <ul className="space-y-2 list-none">
            {[
              '회원 식별 및 로그인·본인확인',
              '자녀의 루틴 관리 서비스 제공',
              '가상 포인트 적립 및 내역 관리',
              '서비스 오류 해결 및 고객 문의 대응',
              '서비스 개선을 위한 통계 분석 (비식별화)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. 개인정보 보유·이용 기간">
          <div className="space-y-2">
            <Item label="회원 정보" value="회원 탈퇴 시 즉시 파기" />
            <Item label="자녀 프로필 및 루틴 기록" value="회원 탈퇴 시 즉시 파기" />
            <Item label="전자상거래법상 계약 기록" value="해당 없음 (유료 결제 없음)" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            단, 관계 법령에 보존 의무가 규정된 경우 해당 기간 동안 보관 후 파기합니다.
          </p>
        </Section>

        <Section title="4. 개인정보 제3자 제공">
          <div className="rounded-2xl bg-teal-50 px-4 py-3 text-sm text-teal-800 font-medium">
            서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          </div>
          <p className="text-xs text-slate-500 mt-1">
            단, 이용자의 사전 동의가 있는 경우 또는 법령에 의한 요청이 있는 경우는 예외입니다.
          </p>
        </Section>

        <Section title="5. 개인정보 처리 위탁">
          <p>원활한 서비스 제공을 위해 아래 업체에 처리를 위탁합니다.</p>
          <div className="space-y-2 mt-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 space-y-1">
              <p className="font-semibold text-slate-800">Supabase Inc. (미국)</p>
              <p className="text-xs text-slate-500">위탁 업무: 데이터베이스 저장, 회원 인증 서비스 운영</p>
              <p className="text-xs text-slate-500">보유 기간: 위탁 계약 종료 시 또는 회원 탈퇴 시까지</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 space-y-1">
              <p className="font-semibold text-slate-800">Google LLC (미국)</p>
              <p className="text-xs text-slate-500">위탁 업무: 광고 서비스 제공 (Google AdSense)</p>
              <p className="text-xs text-slate-500">광고 설정: 아동 대상 콘텐츠 처리 적용, 비개인화 광고만 표시</p>
            </div>
          </div>
        </Section>

        <Section title="6. 아동 개인정보 보호">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 space-y-2">
            <p className="font-semibold text-amber-800">만 14세 미만 아동 보호 정책</p>
            <ul className="space-y-1.5 text-amber-900 text-xs">
              <li>• 본 서비스 계정은 만 14세 이상 부모/보호자만 가입할 수 있습니다.</li>
              <li>• 자녀 프로필 정보는 법정대리인(부모/보호자)이 직접 입력하며, 아동 본인이 직접 개인정보를 제공하는 구조가 아닙니다.</li>
              <li>• 광고는 아동 대상 비개인화 광고 설정(COPPA, 구글 아동 정책)을 적용하여 행동 기반 타겟팅을 하지 않습니다.</li>
              <li>• 자녀 정보는 루틴 서비스 제공 목적 외 사용하지 않습니다.</li>
            </ul>
          </div>
        </Section>

        <Section title="7. 이용자의 권리 및 행사 방법">
          <p>이용자(법정대리인 포함)는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="mt-2 space-y-1.5">
            {[
              '개인정보 열람 요청',
              '오류 정정 또는 삭제 요청',
              '처리 정지 요청',
              '회원 탈퇴(개인정보 일괄 삭제)',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                <span className="text-teal-500">→</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">
            행사 방법: 서비스 내 설정 페이지 또는 아래 개인정보 보호책임자에게 이메일로 요청하시면
            10영업일 이내에 처리합니다.
          </p>
        </Section>

        <Section title="8. 개인정보의 파기">
          <p>보유 기간이 경과하거나 목적이 달성된 개인정보는 지체 없이 파기합니다.</p>
          <div className="mt-2 space-y-2">
            <Item label="전자적 파일" value="복구 불가능한 방법으로 영구 삭제" />
            <Item label="서면 자료" value="해당 없음 (서비스 특성상 종이 서류 없음)" />
          </div>
        </Section>

        <Section title="9. 쿠키 및 자동 수집 정보">
          <p>서비스는 로그인 상태 유지를 위해 브라우저 localStorage에 세션 정보를 저장합니다.</p>
          <div className="mt-2 space-y-2">
            <Item label="목적" value="로그인 유지 (세션 관리)" />
            <Item label="거부 방법" value="브라우저 설정에서 localStorage 삭제 가능 (단, 자동 로그아웃됨)" />
          </div>
        </Section>

        <Section title="10. 개인정보 보호책임자">
          <div className="space-y-2">
            <Item label="서비스명" value={SERVICE_NAME} />
            <Item label="이메일" value={CONTACT_EMAIL} />
            <Item label="처리 기간" value="문의 접수 후 10영업일 이내 답변" />
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
            개인정보 관련 불만이나 피해 구제를 위해 아래 기관에 도움을 요청하실 수 있습니다.
            <ul className="mt-2 space-y-1">
              <li>• 개인정보 침해신고센터: privacy.kisa.or.kr / ☎ 118</li>
              <li>• 개인정보 분쟁조정위원회: www.kopico.go.kr / ☎ 1833-6972</li>
              <li>• 대검찰청 사이버수사과: www.spo.go.kr / ☎ 1301</li>
              <li>• 경찰청 사이버수사국: ecrm.police.go.kr / ☎ 182</li>
            </ul>
          </div>
        </Section>

        <Section title="11. 개인정보처리방침 변경">
          <p>
            본 방침은 법령 변경 또는 서비스 정책 변경 시 개정될 수 있습니다.
            변경 시 서비스 내 공지 또는 이메일로 사전 안내하며, 변경 내용은 시행일 7일 전부터 확인할 수 있습니다.
          </p>
          <Item label="현행 방침 시행일" value={EFFECTIVE_DATE} />
        </Section>

        <p className="text-center text-xs text-slate-400 py-4">
          본 개인정보처리방침은 대한민국 법률에 따라 작성되었습니다.
        </p>
      </div>
    </div>
  );
}
