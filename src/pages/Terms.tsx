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

export default function Terms() {
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
          <h1 className="mt-1 text-2xl font-bold text-slate-900">이용약관</h1>
          <p className="mt-2 text-xs text-slate-400">시행일: {EFFECTIVE_DATE}</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            본 약관은 '{SERVICE_NAME}' 서비스(이하 "서비스")를 이용함에 있어 서비스 운영자와 이용자 간의
            권리·의무 및 이용 조건을 규정합니다. 서비스에 가입하거나 이용하는 경우 본 약관에 동의한 것으로 간주합니다.
          </p>
        </header>

        <Section title="제1조 (목적)">
          <p>
            본 약관은 '{SERVICE_NAME}' 서비스의 이용과 관련하여 서비스 운영자와 회원 간의 권리·의무,
            서비스 이용 조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </Section>

        <Section title="제2조 (용어 정의)">
          <ul className="space-y-2">
            {[
              { term: '서비스', def: '사부작 웹 애플리케이션 및 관련 부가 서비스 일체' },
              { term: '회원', def: '서비스에 가입하여 이용 자격을 부여받은 만 14세 이상의 부모 또는 보호자' },
              { term: '자녀 프로필', def: '회원이 서비스 내에 등록한 자녀(피보호자)의 정보' },
              { term: '포인트', def: '자녀가 루틴을 완료하여 적립되는 서비스 내 가상 수치. 현금 가치 없음' },
              { term: '루틴', def: '서비스에서 제공하거나 회원이 설정한 자녀의 일상 과제 항목' },
            ].map(({ term, def }) => (
              <li key={term} className="rounded-2xl bg-slate-50 px-4 py-3">
                <span className="font-semibold text-teal-700">"{term}"</span>
                <span className="text-slate-700">이란 {def}를 말합니다.</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="제3조 (약관의 효력 및 변경)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>본 약관은 서비스 화면에 게시하거나 이메일로 공지함으로써 효력이 발생합니다.</li>
            <li>서비스는 합리적 사유가 있을 경우 약관을 변경할 수 있으며, 변경 시 시행일 7일 전에 공지합니다.</li>
            <li>변경된 약관에 동의하지 않는 회원은 탈퇴할 수 있으며, 공지 후 계속 이용 시 변경 약관에 동의한 것으로 봅니다.</li>
          </ul>
        </Section>

        <Section title="제4조 (서비스 내용)">
          <p>서비스는 다음 기능을 제공합니다.</p>
          <ul className="mt-2 space-y-1.5">
            {[
              '자녀의 아침·저녁 할일 설정 및 관리',
              '루틴 완료 체크 및 부모 승인 기능',
              '가상 포인트 적립 및 내역 조회',
              '루틴 완료 현황 통계',
              '부모/자녀 화면 분리 제공',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                <span className="text-teal-500">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-2">
            서비스는 무료로 제공되며, 유료 기능이 추가될 경우 별도로 안내합니다.
          </p>
        </Section>

        <Section title="제5조 (회원 가입)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>회원 가입은 만 14세 이상 부모 또는 법정대리인만 가능합니다.</li>
            <li>이메일 주소와 비밀번호로 가입하며, 정확한 정보를 입력해야 합니다.</li>
            <li>허위 정보 입력으로 발생하는 불이익은 회원 본인이 부담합니다.</li>
            <li>1인이 복수의 계정을 생성하여 서비스를 부정 이용하는 것은 금지됩니다.</li>
          </ul>
        </Section>

        <Section title="제6조 (회원 탈퇴 및 자격 상실)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>회원은 언제든지 서비스 내 설정 페이지 또는 이메일을 통해 탈퇴를 요청할 수 있습니다.</li>
            <li>탈퇴 즉시 회원 정보 및 자녀 프로필, 루틴 기록이 영구 삭제됩니다.</li>
            <li>다음에 해당하는 경우 서비스는 회원 자격을 제한하거나 해지할 수 있습니다:
              <ul className="mt-1 ml-4 space-y-0.5 text-slate-600">
                <li>- 타인의 정보를 도용하거나 허위 정보를 등록한 경우</li>
                <li>- 서비스 운영을 방해하거나 타인의 이용을 방해한 경우</li>
                <li>- 본 약관을 위반한 경우</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="제7조 (자녀 프로필 및 루틴 관리)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>자녀 프로필 정보는 회원(부모/보호자)이 직접 입력하며, 정확성에 대한 책임은 회원에게 있습니다.</li>
            <li>등록된 자녀 정보는 해당 계정 회원만 조회·수정·삭제할 수 있습니다.</li>
            <li>루틴 완료 기록은 자녀가 체크하고 부모가 승인하는 방식으로 운영됩니다.</li>
          </ul>
        </Section>

        <Section title="제8조 (포인트 시스템)">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 mb-3">
            <p className="font-semibold text-amber-800 text-sm">⚠️ 포인트는 현금 가치가 없습니다</p>
          </div>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>포인트는 자녀의 루틴 완료 습관 형성을 돕기 위한 서비스 내 가상 수치입니다.</li>
            <li>포인트는 현금, 실물 상품, 기타 유가물로 교환·환전·양도할 수 없습니다.</li>
            <li>포인트는 계정 탈퇴 또는 서비스 종료 시 소멸하며, 이에 대한 보상을 제공하지 않습니다.</li>
            <li>부모가 자녀에게 용돈 지급 여부를 결정하는 기능은 서비스 외부에서 이루어지는 가족 간 결정이며, 서비스는 실제 금전 거래에 관여하지 않습니다.</li>
          </ul>
        </Section>

        <Section title="제9조 (금지 행위)">
          <p>회원은 다음 행위를 해서는 안 됩니다.</p>
          <ul className="mt-2 space-y-1.5">
            {[
              '타인의 계정 정보를 도용하거나 무단으로 접근하는 행위',
              '서비스의 정상적인 운영을 방해하는 행위',
              '서비스를 이용하여 타인의 개인정보를 수집하는 행위',
              '서비스의 소스코드, 데이터베이스를 무단으로 복제·배포·수정하는 행위',
              '법령 또는 공서양속에 반하는 행위',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                <span className="text-rose-500 mt-0.5">✕</span> {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="제10조 (서비스 제공 중단 및 변경)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>서비스는 시스템 점검, 설비 고장, 천재지변 등의 사유로 일시 중단될 수 있습니다.</li>
            <li>서비스의 내용·기능은 서비스 운영 정책에 따라 변경될 수 있으며, 중요한 변경 사항은 사전에 공지합니다.</li>
            <li>무료 서비스의 전부 또는 일부가 종료될 경우, 30일 전에 공지합니다.</li>
          </ul>
        </Section>

        <Section title="제11조 (책임의 제한)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>서비스는 천재지변, 불가항력적 사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.</li>
            <li>서비스는 회원의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
            <li>서비스는 무료로 제공되는 서비스의 이용과 관련하여 발생한 손해에 대해 법령에서 정하는 경우 외에는 책임을 부담하지 않습니다.</li>
            <li>서비스는 회원이 서비스를 이용하여 기대하는 효과(자녀의 루틴 형성 등)를 보장하지 않습니다.</li>
          </ul>
        </Section>

        <Section title="제12조 (광고)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다.</li>
            <li>광고는 아동 대상 비개인화 광고 설정을 적용하여 행동 기반 타겟팅 광고를 하지 않습니다.</li>
            <li>광고 클릭 등 제3자 광고 서비스 이용은 해당 서비스의 이용약관 및 개인정보처리방침을 따릅니다.</li>
          </ul>
        </Section>

        <Section title="제13조 (분쟁 해결)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>서비스 이용과 관련한 분쟁은 먼저 이메일({CONTACT_EMAIL})을 통해 협의합니다.</li>
            <li>협의가 이루어지지 않는 경우, 소비자기본법에 따라 소비자분쟁조정위원회의 조정을 거칠 수 있습니다.</li>
          </ul>
        </Section>

        <Section title="제14조 (준거법 및 재판관할)">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>본 약관은 대한민국 법률에 따라 해석되고 적용됩니다.</li>
            <li>서비스 이용과 관련한 소송의 관할법원은 민사소송법에 따른 법원으로 합니다.</li>
          </ul>
        </Section>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">문의</p>
          <p className="text-sm text-slate-500">이용약관 관련 문의는 아래 이메일로 연락 주세요.</p>
          <p className="text-sm font-semibold text-teal-700">{CONTACT_EMAIL}</p>
          <p className="text-xs text-slate-400 mt-2">부칙: 본 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
        </div>

        <p className="text-center text-xs text-slate-400 py-4">
          본 이용약관은 대한민국 법률에 따라 작성되었습니다.
        </p>
      </div>
    </div>
  );
}
