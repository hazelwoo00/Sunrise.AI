import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, Loader2, CheckCircle2, AlertTriangle, ArrowRight, Download, Wand2, FileText, Link as LinkIcon, ChevronLeft, Upload, X } from 'lucide-react';
import { LoadingOrb } from '../components/LoadingOrb';

export const DesignQA = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState('TDS');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep(3);
    }, 4000);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <button 
        onClick={handleBack}
        className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">
          {step === 3 ? '입력 페이지로 돌아가기' : '대시보드로 돌아가기'}
        </span>
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-2 text-accent-blue font-bold mb-2">
          <ShieldCheck size={18} />
          <span>Component QA Suite</span>
        </div>
        <h1 className="text-4xl font-bold">통합 디자인 QA 도구</h1>
        <p className="text-text-secondary mt-2">디자인 토큰, 네이밍, 시스템 준수도를 통합 검수합니다.</p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="glass p-12 rounded-[40px]">
                <form onSubmit={handleStartScan} className="space-y-8">
                  <div className="flex flex-col gap-3">
                    <label className="block text-sm font-bold text-text-secondary px-1">Figma 파일 URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                      <input 
                        type="url" 
                        placeholder="https://www.figma.com/file/..." 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="block text-sm font-bold text-text-secondary px-1">디자인 라이브러리 선택</label>
                    <select 
                      value={selectedLibrary}
                      onChange={(e) => setSelectedLibrary(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all appearance-none"
                    >
                      <option value="TDS">Toss Design System (TDS)</option>
                      <option value="Material">Material Design 3</option>
                      <option value="Apple">Apple Human Interface Guidelines</option>
                      <option value="Custom">커스텀 라이브러리 업로드...</option>
                    </select>
                  </div>

                  {selectedLibrary === 'Custom' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-3"
                    >
                      <label className="block text-sm font-bold text-text-secondary px-1">커스텀 라이브러리 파일 (.json, .zip)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                          customFile ? 'border-success bg-success/5' : 'border-gray-200 hover:border-accent-blue hover:bg-accent-blue/5'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => setCustomFile(e.target.files?.[0] || null)}
                          accept=".json,.zip"
                        />
                        {customFile ? (
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                              <FileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm truncate">{customFile.name}</p>
                              <p className="text-xs text-text-tertiary">{(customFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCustomFile(null);
                              }}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <X size={20} className="text-text-tertiary" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-text-tertiary">
                              <Upload size={24} />
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-sm">파일을 클릭하거나 드래그하세요</p>
                              <p className="text-xs text-text-tertiary mt-1">JSON 또는 ZIP 형식 지원</p>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full py-5 rounded-2xl font-bold text-xl text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    style={{ backgroundColor: '#E785EB' }}
                  >
                    검사 시작 <ArrowRight size={24} />
                  </button>
                </form>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <FileText className="text-accent-blue" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm">토큰 불일치</h4>
                    <p className="text-[11px] text-text-tertiary">정의되지 않은 값 탐지</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Wand2 className="text-accent-pink" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm">네이밍 정리</h4>
                    <p className="text-[11px] text-text-tertiary">체계적인 규칙 적용</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="text-accent-coral" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm">준수도 리포트</h4>
                    <p className="text-[11px] text-text-tertiary">전체 시스템 점수 산출</p>
                  </div>
                </div>
              </div>
            </div>
        )}

        {isScanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-bg-primary/80 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="max-w-md w-full px-6">
              <div className="glass p-10 rounded-[32px] text-center">
                <LoadingOrb size={120} className="mb-8" />
                <h2 className="text-2xl font-bold mb-8">디자인 시스템을 통합 분석 중입니다</h2>
                
                <div className="space-y-6 text-left">
                  {[
                    { label: '파일 로드 중', status: 'done' },
                    { label: '토큰 불일치 분석 중', status: 'loading' },
                    { label: '네이밍 규칙 검사 중', status: 'waiting' },
                    { label: '준수도 리포트 생성 중', status: 'waiting' },
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
                    animate={{ width: '60%' }}
                    transition={{ duration: 4 }}
                    className="h-full btn-gradient"
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
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-8 rounded-3xl text-center">
                <div className="text-text-secondary font-bold text-sm uppercase tracking-widest mb-2">총 검사 항목</div>
                <div className="text-4xl font-bold">12개</div>
              </div>
              <div className="glass p-8 rounded-3xl text-center border-success/20">
                <div className="text-success font-bold text-sm uppercase tracking-widest mb-2">일치 항목</div>
                <div className="text-4xl font-bold text-success">9개</div>
              </div>
              <div className="glass p-8 rounded-3xl text-center border-error/20">
                <div className="text-error font-bold text-sm uppercase tracking-widest mb-2">오류 항목</div>
                <div className="text-4xl font-bold text-error">3개</div>
              </div>
            </div>

            {/* Violations List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold px-2">발견된 오류 (3)</h2>
              
              <div className="glass p-8 rounded-[32px] border-l-4 border-l-error">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center text-error shrink-0">
                      <AlertTriangle size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Button - Primary</h3>
                      <p className="text-error font-bold mb-4">색상 불일치</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-xs text-text-tertiary uppercase font-bold mb-1">현재 상태</div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#4D89FF]" />
                            <span className="font-mono text-sm">#4D89FF</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-text-tertiary uppercase font-bold mb-1">권장 상태</div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-accent-blue" />
                            <span className="font-mono text-sm">#6368FB (primary-blue)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button 
                      className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                      style={{ backgroundColor: '#E785EB' }}
                    >
                      <Wand2 size={18} /> 자동 수정
                    </button>
                    <button className="px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                      무시하기
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[32px] border-l-4 border-l-warning">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center text-warning shrink-0">
                      <AlertTriangle size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Card Container</h3>
                      <p className="text-warning font-bold mb-4">간격 불일치</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-xs text-text-tertiary uppercase font-bold mb-1">현재 상태</div>
                          <div className="font-bold">18px</div>
                        </div>
                        <div>
                          <div className="text-xs text-text-tertiary uppercase font-bold mb-1">권장 상태</div>
                          <div className="font-bold text-accent-blue">16px (spacing-md)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button 
                      className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                      style={{ backgroundColor: '#E785EB' }}
                    >
                      <Wand2 size={18} /> 자동 수정
                    </button>
                    <button className="px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                      무시하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-10">
              <button 
                className="flex-1 py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                style={{ backgroundColor: '#E785EB' }}
              >
                모두 자동 수정 <Wand2 size={20} />
              </button>
              <button className="flex-1 py-5 rounded-2xl font-bold text-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                QA 리포트 다운로드 <Download size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
