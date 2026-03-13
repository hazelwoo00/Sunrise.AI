import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Image, ShieldCheck, Type, ArrowRight, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, subtitle, description, bullets, delay, iconBg }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-8 rounded-[24px] card-hover flex flex-col h-full"
  >
    <div 
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-md"
      style={{ backgroundColor: iconBg }}
    >
      <Icon className="text-white" size={28} />
    </div>
    <div className="mb-2">
      <span className="text-[#707070] font-bold text-sm uppercase tracking-wider">{title}</span>
    </div>
    <h3 className="text-2xl font-bold mb-4">{subtitle}</h3>
    <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
      {description}
    </p>
    <ul className="space-y-3">
      {bullets.map((bullet: string, i: number) => (
        <li key={i} className="text-sm text-text-tertiary flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          {bullet}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Step = ({ number, title, description, isLast, bg }: any) => (
  <div className="flex flex-col items-center text-center relative flex-1">
    <div 
      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg z-10"
      style={{ backgroundColor: bg }}
    >
      {number}
    </div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-text-secondary max-w-[200px]">{description}</p>
    {!isLast && (
      <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-gradient-to-r from-accent-blue/30 to-accent-pink/30" />
    )}
  </div>
);

export const LandingPage = () => {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white/30 shadow-sm mb-8"
        >
          <Sparkles size={16} className="text-accent-blue" />
          <span className="text-sm font-semibold text-text-secondary">AI 기반 Figma 도구 모음</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]"
        >
          디자인 시스템 빌드의 시작, <br />
          <span className="text-gradient">Sunrise.AI</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          레퍼런스 분석부터 자동 검수, 커스텀 빌더까지 <br />
          디자인 시스템 구축의 모든 과정을 Sunrise.AI가 지원합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Link to="/dashboard" className="btn-gradient px-10 py-5 rounded-2xl text-lg shadow-xl hover:shadow-2xl">
            무료로 시작하기
          </Link>
          <span className="text-sm text-[#848484]"> 회원가입 없이, 월 10회 무료</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 mb-40">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">3가지 핵심 기능</h2>
          <div className="w-16 h-1 bg-black/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Image}
            title="Reference to System"
            subtitle="레퍼런스 이미지 분석"
            description="Dribbble, Pinterest 등 레퍼런스 이미지를 분석해 색상, 타이포, 간격 시스템을 즉시 추출합니다."
            bullets={["Figma 라이브러리 생성", "Variables 자동 설정"]}
            delay={0.1}
            iconBg="#6368FB"
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="Component QA Suite"
            subtitle="통합 디자인 QA 도구"
            description="디자인 토큰 불일치 감지부터 네이밍 자동 정리까지, 시스템 준수도를 한 번에 검수합니다."
            bullets={["네이밍 자동 정리", "QA 리포트 제공"]}
            delay={0.2}
            iconBg="#E785EB"
          />
          <FeatureCard 
            icon={Sparkles}
            title="Custom System Builder"
            subtitle="맞춤형 시스템 빌더"
            description="기본 스타일 설정만으로 전체 색상 팔레트와 컴포넌트 세트를 AI가 자동 생성합니다."
            bullets={["Scale 자동 생성", "Figma Variables 연동"]}
            delay={0.3}
            iconBg="#FDAB8B"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="guide" className="bg-white py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-4">사용 방법</h2>
            <p className="text-text-secondary">단 세 단계로 디자인 생산성을 극대화하세요</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between items-start">
            <Step 
              number="1" 
              title="기능 선택" 
              description="필요한 AI 도구를 대시보드에서 선택하세요" 
              bg="#6368FB"
            />
            <Step 
              number="2" 
              title="파일 업로드" 
              description="이미지나 Figma 파일 URL을 입력하세요" 
              bg="#E785EB"
            />
            <Step 
              number="3" 
              title="AI 분석 완료" 
              description="AI가 분석한 결과를 확인하고 Figma로 내보내세요" 
              isLast 
              bg="#FDAB8B"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 mb-40">
        <div className="glass p-16 rounded-[40px] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full btn-gradient opacity-[0.03] pointer-events-none" />
          <h2 className="text-4xl font-bold mb-8">지금 바로 시작해보세요</h2>
          <p className="text-lg text-text-secondary mb-12 max-w-xl mx-auto">
            디자인 시스템 구축과 관리가 그 어느 때보다 쉬워집니다. <br />
            Sunrise.AI와 함께 더 창의적인 일에 집중하세요.
          </p>
          <Link to="/dashboard" className="btn-gradient px-12 py-5 rounded-2xl text-xl inline-flex items-center gap-3">
            무료로 시작하기 <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};
