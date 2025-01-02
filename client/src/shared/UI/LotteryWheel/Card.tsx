import { motion } from 'framer-motion';
import styled from 'styled-components';
import React from 'react';

interface CardProps {
  $isHighlighted?: boolean;
  $isAnimating?: boolean;
  $isWinner?: boolean;
}

const StyledCard = styled(motion.div)<CardProps>`
  width: 100%;
  aspect-ratio: 1;
  background: hsl(var(--b2));
  border: 1px solid hsl(var(--b3));
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: default;
  user-select: none;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  position: relative;
  word-break: break-word;
`;

const festiveColors = [
  {
    background: 'hsl(48, 96%, 53%)',  // Yellow
    glow: 'rgba(255, 215, 0, 0.6)'
  },
  {
    background: 'hsl(326, 85%, 65%)',  // Pink
    glow: 'rgba(255, 105, 180, 0.6)'
  },
  {
    background: 'hsl(169, 85%, 65%)',  // Turquoise
    glow: 'rgba(64, 224, 208, 0.6)'
  },
  {
    background: 'hsl(280, 85%, 65%)',  // Purple
    glow: 'rgba(147, 112, 219, 0.6)'
  },
  {
    background: 'hsl(15, 85%, 65%)',   // Coral
    glow: 'rgba(255, 127, 80, 0.6)'
  }
];

export const Card = ({ children, ...props }: CardProps & { children: React.ReactNode }) => {
  // Shuffle the colors array
  const shuffledColors = React.useMemo(() => {
    return [...festiveColors]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // Take 3 random colors
  }, []);

  const [highlightColor] = React.useState(() => 
    festiveColors[Math.floor(Math.random() * festiveColors.length)]
  );

  const variants = {
    normal: {
      scale: 1,
      background: 'hsl(var(--b2))',
      color: 'hsl(var(--bc))',
      textShadow: 'none',
      boxShadow: 'none',
      fontWeight: 'normal',
      zIndex: 0,
    },
    highlighted: {
      scale: 1.08,
      background: shuffledColors.map(c => c.background),
      color: 'hsl(0, 0%, 10%)',
      textShadow: shuffledColors.map(c => `0 0 12px ${c.glow}`),
      boxShadow: shuffledColors.map(c => `0 0 15px ${c.glow}`),
      fontWeight: 600,
      zIndex: 1,
      rotate: [-0.5, 0.5],
      transition: {
        duration: 0.4,
        background: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        },
        textShadow: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        },
        boxShadow: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        },
        rotate: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 0.8,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.3,
          ease: "backOut"
        }
      }
    },
    winner: {
      scale: 1.1,
      background: 'linear-gradient(135deg, hsl(45, 100%, 55%) 0%, hsl(36, 100%, 45%) 100%)',
      color: 'hsl(0, 0%, 10%)',
      textShadow: '0 0 15px rgba(255, 223, 0, 0.8)',
      boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
      fontWeight: 700,
      zIndex: 2,
      rotate: [0, -3, 3, -3, 3, 0],
      transition: {
        duration: 0.5,
        rotate: {
          duration: 0.5,
          repeat: 3,
          ease: "easeInOut"
        }
      }
    },
    animating: {
      scale: [1, 1.15, 1],
      rotate: [-1, 1, -1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.8,
        ease: "easeInOut"
      },
    },
  };

  const getAnimationState = () => {
    if (props.$isWinner) return 'winner';
    if (props.$isHighlighted) return 'highlighted';
    if (props.$isAnimating) return 'animating';
    return 'normal';
  };

  return (
    <StyledCard
      variants={variants}
      animate={getAnimationState()}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      {...props}
    >
      {children}
    </StyledCard>
  );
};
