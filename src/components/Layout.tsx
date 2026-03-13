import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronRight, ExternalLink, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppLogo } from './AppLogo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.length > 1;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <AppLogo variant={1} size={32} className="drop-shadow-sm" />
          <span className="text-2xl font-bold tracking-tight text-text-primary">Sunrise.AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-text-secondary hover:text-text-primary transition-colors font-medium">제품 소개</Link>
          <Link to="/#guide" className="text-text-secondary hover:text-text-primary transition-colors font-medium">가이드</Link>
          <Link to="/#pricing" className="text-text-secondary hover:text-text-primary transition-colors font-medium">요금제</Link>
        </nav>

        <div className="flex items-center gap-4">
          {isDashboard ? (
            <div className="flex items-center gap-3 bg-white/50 p-1 pr-4 rounded-full border border-white/30 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="font-medium text-sm hidden sm:inline">디자이너 김토스</span>
            </div>
          ) : (
            <Link 
              to="/dashboard" 
              className="bg-text-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-black transition-all active:scale-95"
            >
              로그인
            </Link>
          )}
          
          <button 
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <Link to="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary">제품 소개</Link>
              <Link to="/#guide" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary">가이드</Link>
              <Link to="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-secondary">요금제</Link>
              <hr className="border-gray-100" />
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-accent-blue">대시보드로 이동</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <AppLogo variant={1} size={32} />
              <span className="text-2xl font-bold tracking-tight">Sunrise.AI</span>
            </Link>
            <p className="text-text-secondary leading-relaxed mb-6">
              Figma 디자인 시스템을 위한 AI 도구 모음. <br />
              반복적인 디자인 작업을 AI로 자동화하세요.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">제품</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link to="/#features" className="hover:text-accent-blue transition-colors">제품 소개</Link></li>
              <li><Link to="/#pricing" className="hover:text-accent-blue transition-colors">가격 정책</Link></li>
              <li><Link to="#" className="hover:text-accent-blue transition-colors">업데이트</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">리소스</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link to="#" className="hover:text-accent-blue transition-colors">가이드</Link></li>
              <li><Link to="#" className="hover:text-accent-blue transition-colors">API 문서</Link></li>
              <li><Link to="#" className="hover:text-accent-blue transition-colors">커뮤니티</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">지원</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link to="#" className="hover:text-accent-blue transition-colors">문의하기</Link></li>
              <li><Link to="#" className="hover:text-accent-blue transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-accent-blue transition-colors">피드백</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-tertiary">
          <p>© 2026 Sunrise.AI. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-text-secondary transition-colors">개인정보 처리방침</Link>
            <Link to="#" className="hover:text-text-secondary transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
