import { SectionContent } from './SubPageLayout';

export const SUBPAGE_DATA: Record<string, SectionContent> = {
  // --- COMPANY ---
  '/company/story': {
    title: 'Brand Story',
    subtitle: 'THE ART OF TRUTH',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    description: [
      '선진 민간수사 그룹의 여정은 "보이지 않는 진실을 향한 가차없는 추구"에서 시작되었습니다. 우리는 법망의 사각지대에서 고통받는 이들을 위해, 가장 합법적이면서도 강력한 정보력을 제공하기 위해 설립되었습니다.',
      '지난 수년간 수많은 미제 사건과 복잡한 기업 분쟁을 해결하며, 우리는 단순한 조사를 넘어 하나의 "해결 모델"로 진화하였습니다. 우리의 이름 "선진(SUNJIN)"은 앞서 나가는 기술과 품격 있는 정석 수사를 의미합니다.'
    ],
    gridItems: [
      { title: 'Tradition of Excellence', text: '검증된 베테랑 수사원들로 구성된 엘리트 팀이 최전선에서 움직입니다.' },
      { title: 'Uncompromising Integrity', text: '우리는 어떤 타협도 거부하며 100%의 기밀 유지를 최우선 가치로 삼습니다.' },
      { title: 'Global Network', text: '전 세계 주요 거점과의 실시간 네트워킹을 통해 국경 없는 정보 수집이 가능합니다.' }
    ]
  },
  '/company/about': {
     title: 'Company Intro',
     subtitle: 'ELITE INTELLIGENCE',
     image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
     description: [
       '선진은 초정밀 정보 통합 관리 솔루션을 제공하는 글로벌 파트너입니다. 기업의 생존을 위협하는 내부 정보 유출부터, 개인의 평온을 깨트리는 위기 상황까지 선진은 가장 명확한 답을 제시합니다.',
       '우리의 본사는 서울의 중심 테헤란로에 위치하며, 디지털 포렌식 센터와 현장 수사본부를 분리 운영하여 압도적인 효율성과 보안을 유지하고 있습니다.'
     ],
     gridItems: [
       { title: 'Organization', text: '법률팀, 현장조사팀, 기술지원팀의 유기적인 협업 시스템을 구축하고 있습니다.' },
       { title: 'Vision', text: '아시아를 넘어 세계 최고의 민간수사 에이전시로 도약하는 것이 우리의 비전입니다.' },
       { title: 'Security', text: '군사 인텔리전스 급의 데이터 암호화 통신망을 통해 고객 정보를 보호합니다.' }
     ]
  },
  '/company/values': {
    title: 'Responsibility & Values',
    subtitle: 'TRUSTED GUARD',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    description: [
      '정보는 힘이지만, 책임이 뒤따르지 않는 정보는 흉기가 될 수 있습니다. 선진은 철저한 윤리 의식과 법률 준수를 최상의 가치로 여기며, 수집된 모든 증거는 법적 효력을 갖추는 데 집중합니다.',
      '고객의 신뢰는 우리의 근간입니다. 우리는 불필요한 고비용 조사를 지양하고, 문제 해결의 핵심을 찌르는 최적의 경로만을 탐색합니다.'
    ]
  },
  '/company/competency': {
     title: 'Core Competency',
     subtitle: 'DECISIVE EDGE',
     image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
     description: [
       '선진의 핵심 역량은 "디지털과 아날로그의 완벽한 융합"에서 나옵니다. 최첨단 포렌식 장비와 수십 년 경력의 현장 요원들이 동시에 투입되어 가해자가 남긴 아주 미세한 흔적조차 놓치지 않습니다.',
       '우리는 공개된 소스(OSINT)는 물론, 폐쇄적인 정보망 접근 역량을 갖추고 있어 타 업체가 접근조차 불가능한 영역에서 결과를 도출합니다.'
     ]
  },

  // --- BUSINESS ---
  '/business/divorce': {
    title: 'Divorce & Family',
    subtitle: 'FAMILY JUSTICE',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    description: [
      '가족 간의 분쟁은 가장 고통스럽고 섬세한 접근이 필요한 영역입니다. 선진은 이혼 소송의 결정적 증거 수집(외도, 재산 은닉 등)과 더불어, 자녀 보호를 위한 신원 확인 업무를 수행합니다.',
      '모든 조사는 의뢰인의 심리적 안정을 최우선으로 고려하며, 획득된 증거가 법정에서 배척되지 않도록 전문 변호인단과 협업합니다.'
    ]
  },
  '/business/litigation': {
    title: 'Litigation & Evidence',
    subtitle: 'LEGAL PROOF',
    image: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=2071&auto=format&fit=crop',
    description: [
      '민형사 소송에서 승리의 열쇠는 "누구도 반박할 수 없는 명백한 증거"에 있습니다. 선진은 위증을 파헤치고, 사라진 목격자를 확보하며, 문서의 진위를 가리는 고도의 조사 기법을 동원합니다.',
      '수사 기관이 다루기 어려운 개인 간의 민사 채무 관계 및 권리 침해 사실을 입각하여 증명해 드립니다.'
    ]
  },
  '/business/forensics': {
    title: 'Digital & TSCM',
    subtitle: 'CYBER SHIELD',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    description: [
      '디지털 데이터는 거짓말을 하지 않습니다. 선진의 포렌식 센터는 삭제된 카카오톡 메시지, 메일로그, 브라우저 방문 기록 등을 정밀 복원하여 감춰진 패턴을 분석합니다.',
      '또한, 도청 장치 및 몰래카메라 탐지(TSCM) 보안 서비스를 통해 기업 회의실 및 개인 공간의 절대 보안을 보장합니다.'
    ]
  },
  '/business/missing': {
    title: 'Missing Persons',
    subtitle: 'SEARCH & FIND',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop',
    description: [
      '소중한 사람의 실종이나 사기꾼의 소재 파악은 시간과의 싸움입니다. 선진은 독자적인 데이터베이스와 위치 추적 기법을 통해 대상자의 은신처를 신속하게 포착합니다.',
      '과거의 인연을 찾거나, 상속 등 법적 절차를 위한 거주지 확인 등 다양한 니즈에 맞춰 은밀하고 정확하게 움직입니다.'
    ]
  },
  '/business/corporate': {
    title: 'Corporate Risk',
    subtitle: 'DEFENSE STRATEGY',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    description: [
      '기업의 정보 자산은 곧 생존입니다. 선진은 핵심 기술 유출 방지 시스템 구축, 퇴사 대상자 관리, 협력사 평판 조회 등을 통해 잠재적 리스크를 사전에 차단합니다.',
      '내부 횡령이나 배임 사건 발생 시, 신속한 특별 조사를 통해 증거를 조기 확보하고 피해 확산을 방지합니다.'
    ]
  },

  // --- FRAMEWORK ---
  '/framework/model': {
    title: 'Resolution Model',
    subtitle: 'METHODOLOGY',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    description: [
      '선진의 "분쟁 해결 모델"은 (1) 정보 수집 (2) 패턴 분석 (3) 법적 전략 수립 (4) 증거 확보 (5) 분쟁 종결의 5단계 프로세스를 따릅니다.',
      '우리는 단순한 조사 보고서 전달에 그치지 않고, 의뢰인이 원하는 실질적 결과(기소, 합의, 승소)를 얻을 수 있을 때까지 통합 컨설팅을 제공합니다.'
    ]
  },

  // --- PORTFOLIO ---
  '/portfolio/outcome': {
    title: 'Expected Outcomes',
    subtitle: 'TANGIBLE RESULTS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: [
      '선진과 함께함으로써 얻게 되는 가장 큰 가치는 "예측 가능성"입니다. 불확실성으로 가득한 상황에서 우리는 사실에 기반한 데이터로 앞날을 예측하고 대응할 수 있게 합니다.',
      '100%에 가까운 승소 증거 확보율과 기업 보안 사고 제로화는 선진이 의뢰인에게 드리는 약속입니다.'
    ]
  }
};
