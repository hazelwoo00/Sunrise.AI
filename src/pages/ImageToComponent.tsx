import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, Layout, Palette, Type as TypeIcon, ExternalLink, RefreshCcw, ChevronLeft, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { LoadingOrb } from '../components/LoadingOrb';
import { ComponentPreview } from '../components/ComponentPreview';

// Analysis result types
interface Component {
  type: string;
  name: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text?: string;
  style?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    fontSize?: number;
  };
}

interface DesignToken {
  colors: Array<{
    hex: string;
    usage: string;
    frequency?: string;
  }>;
  spacing: string[];
  typography: Array<{
    size: string;
    weight: string;
    family: string;
  }>;
}

interface AnalysisResult {
  components: Component[];
  designTokens: DesignToken;
}

export const ImageToComponent = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'extract' | 'reference'>('extract');
  const [selectedMood, setSelectedMood] = useState<string>('Modern');

  const moods = ['Modern', 'Minimal', 'Bold', 'Elegant', 'Playful', 'Futuristic'];

  const analyzeImage = async (imageBase64: string): Promise<AnalysisResult> => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    
    try {
      const prompt = mode === 'extract' 
        ? `Analyze this GUI screenshot with extreme precision.
           TASK 1: COMPONENT DETECTION
           Identify ALL UI elements with EXACT bounding boxes.
           
           Return JSON:
           {
             "components": [
               {
                 "type": "Button"|"Card"|"Input"|"Text"|"Icon"|"Image",
                 "name": "name",
                 "bbox": {"x": %, "y": %, "width": %, "height": %},
                 "text": "text",
                 "style": {"backgroundColor": "#hex", "textColor": "#hex", "borderRadius": px, "fontSize": px}
               }
             ],
             "designTokens": {
               "colors": [{"hex": "#000", "usage": "background"}],
               "spacing": ["8px"],
               "typography": [{"size": "16px", "weight": "normal", "family": "font"}]
             }
           }
           Pure JSON, no markdown.`
        : `Analyze this reference image and generate a NEW design system inspired by it with a "${selectedMood}" mood.
           
           TASK 1: COMPONENT GENERATION
           Create a set of UI components (Button, Card, Input, etc.) that match the style of the reference image but adapted for the "${selectedMood}" mood.
           Provide estimated bounding boxes for where these components might appear in a typical layout.
           
           Return JSON:
           {
             "components": [
               {
                 "type": "Button"|"Card"|"Input"|"Text"|"Icon"|"Image",
                 "name": "name",
                 "bbox": {"x": %, "y": %, "width": %, "height": %},
                 "text": "text",
                 "style": {"backgroundColor": "#hex", "textColor": "#hex", "borderRadius": px, "fontSize": px}
               }
             ],
             "designTokens": {
               "colors": [{"hex": "#000", "usage": "primary/secondary/background"}],
               "spacing": ["8px", "16px"],
               "typography": [{"size": "16px", "weight": "bold", "family": "font"}]
             }
           }
           Pure JSON, no markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
                  data: imageBase64.split(',')[1]
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (!text) throw new Error('AI 응답이 비어있습니다.');
      
      return JSON.parse(text);
    } catch (error: any) {
      console.error('Analysis error:', error);
      throw new Error(error.message || 'AI 분석 중 오류 발생');
    }
  };

 

  const handleUpload = async (file: File) => {
    setError(null);
    setIsAnalyzing(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;
        setUploadedImage(base64Image);

        try {
          // Call Gemini API for analysis
          const result = await analyzeImage(base64Image);
          setAnalysisResult(result);
          setIsAnalyzing(false);
          setStep(3);
        } catch (analysisError: any) {
          console.error('Analysis error:', analysisError);
          setError(analysisError.message || 'AI 분석 중 오류가 발생했습니다.');
          setIsAnalyzing(false);
        }
      };
      reader.onerror = () => {
        setError('파일을 읽는 중 오류가 발생했습니다.');
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error('Upload error:', error);
      setError(error.message || '파일 업로드 중 오류가 발생했습니다.');
      setIsAnalyzing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 20 * 1024 * 1024) {
        setError('파일 크기가 20MB를 초과합니다.');
        return;
      }
      handleUpload(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setError('파일 크기가 20MB를 초과합니다.');
        return;
      }
      handleUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(1);
      setUploadedImage(null);
      setAnalysisResult(null);
      setError(null);
    } else {
      navigate('/dashboard');
    }
  };

  const handleReanalyze = () => {
    if (uploadedImage) {
      setIsAnalyzing(true);
      analyzeImage(uploadedImage)
        .then((result) => {
          setAnalysisResult(result);
          setIsAnalyzing(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsAnalyzing(false);
        });
    }
  };

  // Group components by type
  const groupedComponents = analysisResult?.components.reduce((acc, component) => {
    const type = component.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(component);
    return acc;
  }, {} as Record<string, Component[]>) || {};

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <button 
        onClick={handleBack}
        className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        <span className="font-medium">
          {step === 3 ? '업로드 페이지로 돌아가기' : '대시보드로 돌아가기'}
        </span>
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-2 text-accent-blue font-bold mb-2">
          <ImageIcon size={18} />
          <span>Image → Component</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          {mode === 'extract' ? 'Image to Design System' : 'Reference to Design System'}
        </h1>
        <p className="text-text-secondary mt-2">
          {mode === 'extract' 
            ? 'GUI 이미지를 분석하여 컴포넌트와 디자인 시스템을 추출해줍니다.' 
            : '레퍼런스 이미지의 스타일을 분석하여 비슷한 무드의 디자인 시스템을 제작해줍니다.'}
        </p>
      </header>

      {error && (
        <div className="mb-8 p-6 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-red-900 mb-1">오류 발생</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto"
          >
            {/* Mode Selection Toggle */}
            <div className="flex justify-center mb-10">
              <div className="bg-gray-100/50 p-1.5 rounded-full flex gap-2 border border-gray-200">
                <button
                  onClick={() => setMode('extract')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    mode === 'extract' 
                      ? 'bg-white text-accent-blue shadow-md' 
                      : 'text-text-tertiary hover:text-text-secondary'
                  }`}
                >
                  <Layout size={18} />
                  GUI 컴포넌트 추출
                </button>
                <button
                  onClick={() => setMode('reference')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    mode === 'reference' 
                      ? 'bg-white text-accent-blue shadow-md' 
                      : 'text-text-tertiary hover:text-text-secondary'
                  }`}
                >
                  <Sparkles size={18} />
                  레퍼런스 기반 제작
                </button>
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/*"
              className="hidden"
            />
            
            <div className="max-w-2xl mx-auto">
              <div 
                onClick={triggerFileInput}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`glass px-16 py-20 rounded-3xl border-2 border-dashed flex flex-col items-center text-center cursor-pointer transition-all gap-12 group ${
                  isDragging 
                    ? 'border-accent-blue bg-accent-blue/5 scale-[1.01] shadow-2xl' 
                    : 'border-gray-200 hover:border-accent-blue'
                }`}
              >
                <div 
                  className="px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl group-hover:scale-105 transition-transform bg-accent-blue text-white font-bold"
                >
                  <Upload size={24} />
                  <span>이미지 업로드</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {mode === 'extract' ? 'GUI 이미지를 업로드하세요' : '레퍼런스 이미지를 업로드하세요'}
                  </h2>
                  <p className="text-text-secondary max-w-md">
                    {mode === 'extract' 
                      ? 'GUI 화면을 분석하여 컴포넌트와 디자인 라이브러리를 추출합니다.' 
                      : '레퍼런스를 분석하여 비슷한 무드의 디자인 시스템을 제안합니다.'}
                  </p>
                  <p className="text-sm text-text-tertiary">최대 파일 크기: 20MB</p>
                </div>
                
                <div className="flex gap-2">
                  {['PNG', 'JPG', 'WEBP'].map(format => (
                    <span key={format} className="px-3 h-[30px] flex items-center justify-center rounded-lg bg-gray-100 text-[12px] font-bold text-text-tertiary border border-gray-200">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-bg-primary/80 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <LoadingOrb size={160} className="mb-10" />
            <h2 className="text-3xl font-bold mb-4">이미지를 분석하고 있습니다...</h2>
            <p className="text-text-secondary text-lg">디자인 시스템과 스타일 가이드를 생성하는 중입니다</p>
          </motion.div>
        )}

        {step === 3 && uploadedImage && analysisResult && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Left: Original Image with Analysis */}
            <div className="lg:col-span-5">
              <div className="glass p-4 rounded-[32px] sticky top-32">
                <div className="relative rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={uploadedImage}
                    alt="Analyzed GUI" 
                    className="w-full h-auto"
                  />
                  
                  {/* Bounding Boxes from AI Analysis */}
                  {analysisResult.components.map((component, index) => {
                    const colors = ['#6368FB', '#FF83AD', '#FDAB8B', '#4ADE80'];
                    const color = colors[index % colors.length];
                    
                    return (
                      <div 
                        key={index}
                        className="absolute border-2 rounded-lg flex items-start"
                        style={{
                          left: `${component.bbox.x}%`,
                          top: `${component.bbox.y}%`,
                          width: `${component.bbox.width}%`,
                          height: `${component.bbox.height}%`,
                          borderColor: color,
                          backgroundColor: `${color}10`
                        }}
                      >
                        <span 
                          className="text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-md"
                          style={{ backgroundColor: color }}
                        >
                          {component.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between items-center px-2">
                  <span className="text-sm font-bold text-text-secondary">분석된 이미지 프리뷰</span>
                  <button 
                    onClick={handleReanalyze}
                    className="text-accent-blue text-sm font-bold flex items-center gap-1 hover:underline"
                  >
                    <RefreshCcw size={14} /> 다시 분석하기
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Results Tabs */}
            <div className="lg:col-span-7">
              <div className="glass rounded-[32px] overflow-hidden flex flex-col h-full">
                <div className="flex border-b border-gray-100">
                  <button 
                    onClick={() => setActiveTab('components')}
                    className={`flex-1 py-6 font-bold text-lg transition-all relative ${activeTab === 'components' ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
                  >
                    컴포넌트 라이브러리
                    {activeTab === 'components' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#6368FB]" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('tokens')}
                    className={`flex-1 py-6 font-bold text-lg transition-all relative ${activeTab === 'tokens' ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
                  >
                    Variables & 가이드
                    {activeTab === 'tokens' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#6368FB]" />}
                  </button>
                </div>

                <div className="p-10 flex-grow overflow-y-auto">
                  {activeTab === 'components' ? (
                    <div className="space-y-8">
                      {Object.entries(groupedComponents).map(([type, components]) => (
                        <section key={type}>
                          <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-widest mb-4">
                            {type} ({(components as Component[]).length}개)
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {(components as Component[]).map((component, index) => (
                              <div key={index} className="flex flex-col rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Visual Preview Section */}
                                <div className="bg-gray-50/50 p-2 border-b border-gray-100">
                                  <ComponentPreview 
                                    type={component.type}
                                    name={component.name}
                                    text={component.text}
                                    style={component.style}
                                  />
                                </div>

                                {/* Info Section */}
                                <div className="p-5">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                                        <Layout size={16} className="text-accent-blue" />
                                      </div>
                                      <div>
                                        <div className="font-bold text-sm text-text-primary">{component.name}</div>
                                        <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{component.type}</div>
                                      </div>
                                    </div>
                                    <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                                  </div>

                                  {component.style && (
                                    <div className="flex flex-wrap gap-2">
                                      {component.style.backgroundColor && (
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
                                          <div 
                                            className="w-3 h-3 rounded-full border border-black/5"
                                            style={{ backgroundColor: component.style.backgroundColor }}
                                          />
                                          <span className="text-[10px] font-mono text-text-secondary">{component.style.backgroundColor}</span>
                                        </div>
                                      )}
                                      {component.style.borderRadius !== undefined && (
                                        <div className="px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold text-text-tertiary">
                                          R: {component.style.borderRadius}px
                                        </div>
                                      )}
                                      {component.style.fontSize !== undefined && (
                                        <div className="px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold text-text-tertiary">
                                          T: {component.style.fontSize}px
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <Palette size={20} className="text-accent-blue" />
                          <h3 className="text-xl font-bold">색상 팔레트</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {analysisResult.designTokens.colors.map((color, index) => (
                            <div key={index} className="flex flex-col gap-2">
                              <div 
                                className="w-full aspect-square rounded-2xl shadow-inner border border-gray-100 relative group" 
                                style={{ backgroundColor: color.hex }} 
                              >
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(color.hex)}
                                    className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded-md"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <span className="font-bold text-sm">{color.hex}</span>
                              <span className="text-xs text-text-tertiary capitalize">{color.usage}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {analysisResult.designTokens.spacing.length > 0 && (
                        <section>
                          <div className="flex items-center gap-2 mb-6">
                            <Layout size={20} className="text-accent-blue" />
                            <h3 className="text-xl font-bold">간격 시스템</h3>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {analysisResult.designTokens.spacing.map((spacing, index) => (
                              <div 
                                key={index}
                                className="px-4 py-2 rounded-xl bg-gray-100 font-bold text-sm"
                              >
                                {spacing}
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <TypeIcon size={20} className="text-accent-coral" />
                          <h3 className="text-xl font-bold">타이포그래피</h3>
                        </div>
                        <div className="space-y-4">
                          {analysisResult.designTokens.typography.map((typo, index) => (
                            <div key={index} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                              <div className="font-bold mb-1" style={{ fontSize: typo.size }}>
                                Sample Text
                              </div>
                              <div className="text-xs text-text-tertiary">
                                {typo.family} / {typo.size} / {typo.weight}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}
                </div>

                <div className="p-10 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                  <button 
                    className="flex-1 py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                    style={{ backgroundColor: '#6368FB' }}
                  >
                    Figma로 내보내기 <ExternalLink size={20} />
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 rounded-2xl font-bold text-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    새 이미지 분석하기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
