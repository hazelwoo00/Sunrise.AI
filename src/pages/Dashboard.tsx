import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Image, ShieldCheck, Type, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';

const StatCard = ({ title, used, total, gradient }: any) => {
  const percentage = (used / total) * 100;
  return (
    <div className="glass p-8 rounded-[20px] flex-1 min-w-[300px]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[#707070] font-bold">{title}</span>
      </div>
      <div className="mb-6 flex items-baseline">
        <span className="text-4xl font-bold text-[#6B7280]">
          {used}
        </span>
        <span className="text-4xl font-bold text-[#1a1a1a] mx-2">/</span>
        <span className="text-4xl font-bold text-[#1a1a1a]">
          {total}
        </span>
        <span className="text-[#707070] ml-2 font-medium">사용</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full"
          style={{ background: gradient }}
        />
      </div>
    </div>
  );
};

const FeatureSelectionCard = ({ icon: Icon, title, subtitle, description, bullets, link, delay, iconBg }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-10 rounded-[24px] card-hover flex flex-col group h-full"
  >
    <div 
      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform"
      style={{ backgroundColor: iconBg }}
    >
      <Icon className="text-white" size={32} />
    </div>
    <div className="mb-2">
      <span className="text-[#707070] font-bold text-sm uppercase tracking-wider">{title}</span>
    </div>
    <h3 className="text-2xl font-bold mb-2">{subtitle}</h3>
    <p className="text-text-secondary mb-8 leading-relaxed">
      {description}
    </p>
    <ul className="space-y-3 mb-10 flex-grow">
      {bullets.map((bullet: string, i: number) => (
        <li key={i} className="text-sm text-text-tertiary flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          {bullet}
        </li>
      ))}
    </ul>
    <Link 
      to={link} 
      className="w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      style={{ backgroundColor: iconBg }}
    >
      시작하기 <ArrowRight size={20} />
    </Link>
  </motion.div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">홈으로 돌아가기</span>
      </button>

      {/* Usage Stats Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">이번 달 사용량</h2>
          <p className="text-sm text-text-secondary">무료 플랜으로 매월 자동 초기화됩니다</p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          <StatCard 
            title="Reference to System" 
            used={0} 
            total={10} 
            gradient="linear-gradient(to right, #6368FB, #FF83AD)"
          />
          <StatCard 
            title="Component QA Suite" 
            used={0} 
            total={5} 
            gradient="linear-gradient(to right, #FF83AD, #FDAB8B)"
          />
          <StatCard 
            title="Custom System Builder" 
            used={0} 
            total={3} 
            gradient="linear-gradient(to right, #FDAB8B, #FFD8AA)"
          />
        </div>
      </section>

      {/* Feature Selection Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-[32px] font-bold mb-4">기능 선택</h2>
          <div className="w-20 h-1 bg-black/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FeatureSelectionCard 
            icon={Image}
            title="Reference to System"
            subtitle="레퍼런스 이미지 분석"
            description="Dribbble, Pinterest 등 레퍼런스 이미지를 분석해 색상, 타이포, 간격 시스템을 즉시 추출합니다."
            bullets={["Figma 라이브러리 생성", "Variables 자동 설정"]}
            link="/image-to-component"
            delay={0.1}
            iconBg="#6368FB"
          />
          <FeatureSelectionCard 
            icon={ShieldCheck}
            title="Component QA Suite"
            subtitle="통합 디자인 QA 도구"
            description="디자인 토큰 불일치 감지부터 네이밍 자동 정리까지, 시스템 준수도를 한 번에 검수합니다."
            bullets={["네이밍 자동 정리", "QA 리포트 제공"]}
            link="/design-qa"
            delay={0.2}
            iconBg="#E785EB"
          />
          <FeatureSelectionCard 
            icon={Sparkles}
            title="Custom System Builder"
            subtitle="맞춤형 시스템 빌더"
            description="기본 스타일 설정만으로 전체 색상 팔레트와 컴포넌트 세트를 AI가 자동 생성합니다."
            bullets={["Scale 자동 생성", "Figma Variables 연동"]}
            link="/system-builder"
            delay={0.3}
            iconBg="#FDAB8B"
          />
        </div>
      </section>
    </div>
  );
};
