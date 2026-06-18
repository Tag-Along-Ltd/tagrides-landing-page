'use client';

import { memo } from 'react';

const DEFAULT_COLORS = ['#008080', '#5F8F8F', '#F59E0B', '#BFE5E5', '#008080'];

export const AuroraText = memo(function AuroraText({
  children,
  className = '',
  colors = DEFAULT_COLORS,
  speed = 1,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animationDuration: `${10 / speed}s`,
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="animate-aurora relative bg-clip-text text-transparent"
        style={{ ...gradientStyle, backgroundSize: '200% auto' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});
