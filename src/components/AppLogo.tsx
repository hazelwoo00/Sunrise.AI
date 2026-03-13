import React from 'react';

interface AppLogoProps {
  variant?: 1 | 2 | 3;
  size?: number;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  variant = 1, 
  size = 1024, 
  className = "" 
}) => {
  const purple = "#8B5CF6";
  const pink = "#EC4899";
  const orange = "#F97316";

  const renderVariant = () => {
    switch (variant) {
      case 1:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={purple} />
                <stop offset="50%" stopColor={pink} />
                <stop offset="100%" stopColor={orange} />
              </linearGradient>
              
              {/* Heavy blur for the internal gradient blobs */}
              <filter id="glassBlurFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
              </filter>

              {/* Inner depth and glow for the glass container */}
              <filter id="innerDepth" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur" />
                <feOffset dx="0" dy="8" result="offsetBlur" />
                <feComposite in="blur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadow" />
                <feFlood floodColor="white" floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="shadow" operator="in" />
                <feComposite in2="SourceAlpha" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Glow for extra depth */}
            <circle cx="512" cy="512" r="450" fill="url(#logoGrad)" filter="url(#glassBlurFilter)" opacity="0.3" />

            {/* The blurred gradient core - multiple blobs for organic "mongle" feel */}
            <g filter="url(#glassBlurFilter)">
              <circle cx="420" cy="420" r="320" fill={purple} opacity="0.9" />
              <circle cx="580" cy="500" r="300" fill={pink} opacity="0.9" />
              <circle cx="480" cy="650" r="320" fill={orange} opacity="0.9" />
            </g>
            
            {/* The Glassmorphism Container with blurred boundary */}
            <circle 
              cx="512" 
              cy="512" 
              r="400" 
              fill="white" 
              fillOpacity="0.06" 
              stroke="white" 
              strokeWidth="4" 
              strokeOpacity="0.2"
              filter="url(#innerDepth)"
              className="blur-[6px]"
            />

            {/* Glass Highlight Arc */}
            <path
              d="M320 320C320 220 420 180 512 180C604 180 704 220 704 320"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            
            {/* Subtle bottom reflection */}
            <path
              d="M400 820C450 840 574 840 624 820"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.1"
            />
          </svg>
        );
      case 2:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <defs>
              <linearGradient id="grad2a" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={purple} />
                <stop offset="100%" stopColor={pink} />
              </linearGradient>
              <linearGradient id="grad2b" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={orange} />
                <stop offset="100%" stopColor={pink} />
              </linearGradient>
              <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
              </filter>
            </defs>
            
            {/* Abstract Fluid Shapes */}
            <path
              d="M300 512C300 300 512 200 724 300C936 400 800 724 512 824C224 924 300 724 300 512Z"
              fill="url(#grad2a)"
              opacity="0.8"
            />
            <path
              d="M724 512C724 724 512 824 300 724C88 624 224 300 512 200C800 100 724 300 724 512Z"
              fill="url(#grad2b)"
              opacity="0.6"
              style={{ mixBlendMode: 'overlay' }}
            />
            
            {/* Glassy Overlay */}
            <circle cx="512" cy="512" r="300" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
          </svg>
        );
      case 3:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <defs>
              <filter id="tokenBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
              </filter>
            </defs>
            
            {/* Layered Translucent Circles (Tokens) */}
            <circle cx="400" cy="400" r="280" fill={purple} opacity="0.7" filter="url(#tokenBlur)" />
            <circle cx="624" cy="450" r="280" fill={pink} opacity="0.7" filter="url(#tokenBlur)" />
            <circle cx="512" cy="650" r="280" fill={orange} opacity="0.7" filter="url(#tokenBlur)" />
            
            {/* Central Connection Point */}
            <circle cx="512" cy="512" r="100" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="4" />
            <path d="M512 412V612M412 512H612" stroke="white" strokeWidth="12" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return renderVariant();
};
