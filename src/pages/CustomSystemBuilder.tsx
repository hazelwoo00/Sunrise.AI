import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Palette, Layout, Type, ArrowRight, Download, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { LoadingOrb } from '../components/LoadingOrb';
import { ComponentPreview } from '../components/ComponentPreview';

export const CustomSystemBuilder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 5000);
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">대시보드로 돌아가기</span>
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-2 text-accent-pink font-bold mb-2">
          <Sparkles size={18} />
          <span>Custom System Builder</span>
        </div>
        <h1 className="text-4xl font-bold">맞춤형 디자인 시스템 생성</h1>
        <p className="text-text-secondary mt-2">기본 스타일 설정만으로 전체 시스템을 AI가 자동 생성합니다.</p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass p-12 rounded-[40px]">
              <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary px-1">Primary Color</label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        defaultValue="#6368FB"
                        className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                      />
                      <input 
                        type="text" 
                        defaultValue="#6368FB"
                        className="flex-grow bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 focus:outline-none focus:border-accent-blue transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary px-1">Secondary Color</label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        defaultValue="#FF83AD"
                        className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                      />
                      <input 
                        type="text" 
                        defaultValue="#FF83AD"
                        className="flex-grow bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 focus:outline-none focus:border-accent-blue transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary px-1">Base Spacing (px)</label>
                    <input 
                      type="number" 
                      defaultValue="8"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 focus:outline-none focus:border-accent-blue transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary px-1">Base Radius (px)</label>
                    <input 
                      type="number" 
                      defaultValue="16"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 focus:outline-none focus:border-accent-blue transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-secondary px-1">Default Font</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 focus:outline-none focus:border-accent-blue transition-all appearance-none">
                      <option>Pretendard</option>
                      <option>Inter</option>
                      <option>Roboto</option>
                      <option>SF Pro Display</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full py-5 rounded-2xl font-bold text-xl text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                      style={{ backgroundColor: '#FDAB8B' }}
                    >
                      시스템 생성 <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Palette className="text-accent-blue" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Color Scale 생성</h4>
                  <p className="text-xs text-text-tertiary">Primary/Secondary 기반 10단계 팔레트 자동 생성</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Layout className="text-accent-pink" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">컴포넌트 세트 생성</h4>
                  <p className="text-xs text-text-tertiary">Button, Card, Input 등 기본 UI 요소 자동 설계</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-bg-primary/80 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="max-w-md w-full px-6">
              <div className="glass p-10 rounded-[32px] text-center">
                <LoadingOrb size={120} className="mb-8" />
                <h2 className="text-2xl font-bold mb-8">디자인 시스템을 생성 중입니다</h2>
                
                <div className="space-y-6 text-left">
                  {[
                    { label: '색상 팔레트 생성 중', status: 'done' },
                    { label: '타이포그래피 스케일 계산 중', status: 'loading' },
                    { label: '컴포넌트 스타일 설계 중', status: 'waiting' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className={`font-medium ${item.status === 'waiting' ? 'text-text-tertiary' : 'text-text-primary'}`}>
                        {item.label}
                      </span>
                      {item.status === 'done' ? (
                        <CheckCircle2 className="text-success" size={20} />
                      ) : item.status === 'loading' ? (
                        <Loader2 className="text-accent-blue animate-spin" size={20} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-100" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-10 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 5 }}
                    className="h-full"
                    style={{ backgroundColor: '#FDAB8B' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="glass p-10 rounded-[40px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">디자인 시스템 생성이 완료되었습니다!</h2>
                  <p className="text-text-secondary">설정한 스타일을 기반으로 전체 라이브러리가 구축되었습니다.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Palette size={20} className="text-accent-blue" />
                    Generated Scales
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-sm font-bold text-text-tertiary mb-3 uppercase tracking-wider">Color Scale (Primary)</div>
                      <div className="flex gap-1 h-12 rounded-lg overflow-hidden">
                        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                          <div key={shade} className="flex-1" style={{ backgroundColor: `color-mix(in srgb, #6368FB, white ${100 - shade/10}%)` }} />
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-sm font-bold text-text-tertiary mb-3 uppercase tracking-wider">Radius Scale</div>
                      <div className="flex gap-3">
                        {['sm: 8px', 'md: 16px', 'lg: 24px'].map(r => (
                          <div key={r} className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs font-bold">{r}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Layout size={20} className="text-accent-pink" />
                    Component Set
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { type: 'Button', name: 'Primary Button', text: 'Button' },
                      { type: 'Input', name: 'Text Input', text: 'Placeholder' },
                      { type: 'Card', name: 'Content Card' },
                      { type: 'Text', name: 'Heading Text', text: 'Sunrise.AI' }
                    ].map(comp => (
                      <div key={comp.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        <div className="bg-gray-50/50 p-2">
                          <ComponentPreview 
                            type={comp.type}
                            name={comp.name}
                            text={comp.text}
                            style={{
                              backgroundColor: '#6368FB',
                              borderRadius: 16,
                            }}
                          />
                        </div>
                        <div className="p-3 flex items-center justify-between border-t border-gray-100">
                          <span className="font-bold text-xs">{comp.name}</span>
                          <CheckCircle2 size={14} className="text-success" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-12">
                <button 
                  className="flex-1 py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                  style={{ backgroundColor: '#FDAB8B' }}
                >
                  Figma 라이브러리로 내보내기 <Download size={20} />
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 rounded-2xl font-bold text-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  다시 설정하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
