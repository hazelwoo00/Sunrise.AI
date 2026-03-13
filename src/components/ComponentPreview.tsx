import React from 'react';

interface ComponentStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontSize?: number;
}

interface ComponentProps {
  type: string;
  name: string;
  text?: string;
  style?: ComponentStyle;
}

export const ComponentPreview: React.FC<ComponentProps> = ({ type, name, text, style }) => {
  const defaultStyles = {
    backgroundColor: style?.backgroundColor || '#6368FB',
    color: style?.textColor || '#FFFFFF',
    borderRadius: style?.borderRadius !== undefined ? `${style.borderRadius}px` : '12px',
    fontSize: style?.fontSize !== undefined ? `${style.fontSize}px` : '14px',
  };

  const renderPreview = () => {
    switch (type) {
      case 'Button':
        return (
          <button
            className="px-6 py-2 font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: defaultStyles.backgroundColor,
              color: defaultStyles.color,
              borderRadius: defaultStyles.borderRadius,
              fontSize: defaultStyles.fontSize,
            }}
          >
            {text || name}
          </button>
        );

      case 'Input':
        return (
          <div className="w-full max-w-[200px] space-y-1.5">
            <div 
              className="w-full h-10 border border-gray-200 bg-white px-3 flex items-center text-gray-400"
              style={{ borderRadius: defaultStyles.borderRadius }}
            >
              {text || 'Placeholder...'}
            </div>
          </div>
        );

      case 'Card':
        return (
          <div 
            className="w-full max-w-[240px] p-4 bg-white shadow-sm border border-gray-100"
            style={{ borderRadius: defaultStyles.borderRadius }}
          >
            <div className="w-full h-24 bg-gray-100 rounded-lg mb-3" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-100 rounded" />
          </div>
        );

      case 'Text':
        return (
          <span 
            style={{ 
              color: style?.textColor || '#1F2937', 
              fontSize: defaultStyles.fontSize,
              fontWeight: 'bold'
            }}
          >
            {text || name}
          </span>
        );

      case 'Icon':
        return (
          <div 
            className="w-10 h-10 flex items-center justify-center"
            style={{ color: defaultStyles.backgroundColor }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
        );

      case 'Image':
        return (
          <div 
            className="w-32 h-20 bg-gray-200 flex items-center justify-center overflow-hidden"
            style={{ borderRadius: defaultStyles.borderRadius }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        );

      default:
        return <div className="text-xs text-text-tertiary italic">No preview available</div>;
    }
  };

  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-inner min-h-[120px]">
      {renderPreview()}
    </div>
  );
};
