import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [cursorState, setCursorState] = useState('default'); // default, hover, active, interactive
  const [isOnHero, setIsOnHero] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useSpring(4, { stiffness: 400, damping: 28 });
  const cursorOpacity = useSpring(1, { stiffness: 300, damping: 30 });

  // Enhanced cursor states with hero-specific colors
  const getCursorColor = (baseColor) => isOnHero ? '#ffffff' : baseColor;
  const getBorderColor = () => isOnHero ? 'rgba(255, 255, 255, 0.6)' : 'rgba(24, 24, 27, 0.6)';

  const cursorStates = {
    default: { size: 4, color: getCursorColor('#18181b'), border: false },
    hover: { size: 24, color: 'transparent', border: true },
    active: { size: 20, color: getCursorColor('#18181b'), border: true },
    interactive: { size: 32, color: 'transparent', border: true }
  };

  // Device and accessibility detection
  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmallScreen = window.innerWidth < 768;

      setIsVisible(!hasTouch && !prefersReducedMotion && !isSmallScreen);
    };

    checkDevice();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const screenQuery = window.matchMedia('(max-width: 768px)');

    motionQuery.addEventListener('change', checkDevice);
    screenQuery.addEventListener('change', checkDevice);
    window.addEventListener('resize', checkDevice);

    return () => {
      motionQuery.removeEventListener('change', checkDevice);
      screenQuery.removeEventListener('change', checkDevice);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Enhanced mouse movement handler
  const handleMouseMove = useCallback((e) => {
    if (!isVisible) return;

    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    const target = e.target;

    // Check if cursor is over hero section
    const heroSection = target.closest('section');
    const isOverHero = heroSection?.querySelector('img[alt*="Hero"]') !== null;
    setIsOnHero(isOverHero);

    const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
    const isButton = target.closest('button, [role="button"]');
    const isLink = target.closest('a');
    const isInput = target.closest('input, textarea, select');

    if (cursorData) {
      setCursorLabel(cursorData);
      setCursorState('interactive');
      cursorSize.set(cursorStates.interactive.size);
    } else if (isButton || isLink) {
      setCursorLabel('');
      setCursorState('active');
      cursorSize.set(cursorStates.active.size);
    } else if (isInput) {
      setCursorLabel('');
      setCursorState('hover');
      cursorSize.set(cursorStates.hover.size);
    } else {
      setCursorLabel('');
      setCursorState('default');
      cursorSize.set(cursorStates.default.size);
    }
  }, [cursorX, cursorY, cursorSize, isVisible]);

  // Mouse interaction handlers
  const handleMouseEnter = useCallback(() => {
    if (!isVisible) return;
    cursorOpacity.set(1);
  }, [cursorOpacity, isVisible]);

  const handleMouseLeave = useCallback(() => {
    if (!isVisible) return;
    cursorOpacity.set(0);
  }, [cursorOpacity, isVisible]);

  const handleMouseDown = useCallback(() => {
    if (!isVisible) return;
    cursorSize.set(cursorSize.get() * 0.7);
  }, [cursorSize, isVisible]);

  const handleMouseUp = useCallback(() => {
    if (!isVisible) return;
    const targetSize = cursorStates[cursorState].size;
    cursorSize.set(targetSize);
  }, [cursorSize, cursorState, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, isVisible]);

  if (!isVisible) return null;

  const currentState = cursorStates[cursorState];

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        body {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          opacity: cursorOpacity,
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: cursorSize,
            height: cursorSize,
            backgroundColor: currentState.color,
            border: currentState.border ? `1px solid ${getBorderColor()}` : 'none',
          }}
          animate={{
            scale: cursorState === 'default' ? 1 : 1,
          }}
          transition={{ duration: 0.15 }}
        />

        {/* Outer ring for interactive states */}
        {cursorState !== 'default' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: cursorSize,
              height: cursorSize,
              border: `1px solid ${isOnHero ? 'rgba(255, 255, 255, 0.3)' : 'rgba(24, 24, 27, 0.3)'}`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Pulse effect for interactive elements */}
        {cursorState === 'interactive' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: cursorSize,
              height: cursorSize,
              border: `1px solid ${isOnHero ? 'rgba(255, 255, 255, 0.2)' : 'rgba(24, 24, 27, 0.2)'}`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Cursor label */}
      <AnimatePresence>
        {cursorLabel && (
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: cursorX,
              top: cursorY,
              x: "-50%",
              y: "calc(-50% + 28px)"
            }}
            initial={{ opacity: 0, scale: 0.8, y: "calc(-50% + 20px)" }}
            animate={{ opacity: 1, scale: 1, y: "calc(-50% + 28px)" }}
            exit={{ opacity: 0, scale: 0.8, y: "calc(-50% + 20px)" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div
              className="backdrop-blur-sm text-[10px] font-mono px-2 py-1 whitespace-nowrap tracking-wider"
              style={{
                backgroundColor: isOnHero ? 'rgba(255, 255, 255, 0.9)' : 'rgba(24, 24, 27, 0.9)',
                color: isOnHero ? '#18181b' : '#ffffff',
                border: `1px solid ${isOnHero ? 'rgba(255, 255, 255, 0.6)' : 'rgba(24, 24, 27, 0.6)'}`,
              }}
            >
              {cursorLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}