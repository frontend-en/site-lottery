import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import React from 'react';

/**
 * Интерфейс для свойств карточки в колесе лотереи
 * @interface CardProps
 * @property {boolean} $isHighlighted - Флаг подсветки карточки (активное состояние)
 * @property {boolean} $isAnimating - Флаг анимации карточки
 * @property {boolean} $isWinner - Флаг выигрышной карточки
 * @property {React.ReactNode} children - Дочерние элементы компонента
 */
interface CardProps {
  $isHighlighted?: boolean;
  $isAnimating?: boolean;
  $isWinner?: boolean;
  children?: React.ReactNode;
}

/**
 * Стилизованный компонент карточки
 * Использует styled-components и framer-motion для анимаций
 */
const StyledCard = styled(motion.div)<CardProps>`
  width: 100%;
  aspect-ratio: 1;
  background: oklch(var(--b2));
  border: 1px solid oklch(var(--a));
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

  /* Градиент для выигрышной карточки */
  &[data-winner="true"] {
    background: linear-gradient(135deg, hsl(45, 100%, 55%) 0%, hsl(36, 100%, 45%) 100%);
  }
`;

/**
 * Интерфейс для определения праздничных цветов
 * @interface FestiveColor
 * @property {string} background - Цвет фона
 * @property {string} glow - Цвет свечения
 */
interface FestiveColor {
  background: string;
  glow: string;
}

/**
 * Массив праздничных цветов для анимации
 * Каждый цвет имеет основной тон и соответствующее свечение
 */
const festiveColors: FestiveColor[] = [
  {
    background: 'hsl(48, 96%, 53%)',  // Желтый
    glow: 'hsla(48, 96%, 53%, 0.6)'
  },
  {
    background: 'hsl(326, 85%, 65%)',  // Розовый
    glow: 'hsla(326, 85%, 65%, 0.6)'
  },
  {
    background: 'hsl(169, 85%, 65%)',  // Бирюзовый
    glow: 'hsla(169, 85%, 65%, 0.6)'
  },
  {
    background: 'hsl(280, 85%, 65%)',  // Фиолетовый
    glow: 'hsla(280, 85%, 65%, 0.6)'
  },
  {
    background: 'hsl(15, 85%, 65%)',   // Коралловый
    glow: 'hsla(15, 85%, 65%, 0.6)'
  }
];

/**
 * Компонент карточки для колеса лотереи
 * Поддерживает различные состояния анимации и стилизации
 * 
 * @component
 * @param {CardProps} props - Свойства компонента
 * @returns {JSX.Element} Карточка лотереи
 */
export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  // Перемешивание массива цветов для случайной анимации
  const shuffledColors = React.useMemo(() => {
    return [...festiveColors]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // Берем 3 случайных цвета
  }, []);

  /**
   * Варианты анимации для различных состояний карточки
   * normal - обычное состояние
   * highlighted - подсвеченное состояние
   * winner - выигрышное состояние
   * animating - состояние анимации
   */
  const variants: Variants = {
    normal: {
      scale: 1,
      backgroundColor: 'oklch(var(--b2))',
      color: 'oklch(var(--bc))', // Используем переменную цвета текста из темы
      textShadow: 'none',
      boxShadow: 'none',
      fontWeight: 400,
      zIndex: 0,
    },
    highlighted: {
      scale: 1.08,
      backgroundColor: shuffledColors.map(c => c.background),
      color: 'oklch(var(--pc))', // Используем контрастный цвет для выделенного состояния
      textShadow: shuffledColors.map(c => `0 0 12px ${c.glow}`),
      boxShadow: shuffledColors.map(c => `0 0 15px ${c.glow}`),
      fontWeight: 600,
      zIndex: 1,
      rotate: [-0.5, 0.5],
      transition: {
        duration: 0.4,
        backgroundColor: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut'
        },
        textShadow: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut'
        },
        boxShadow: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut'
        },
        rotate: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.8,
          ease: 'easeInOut'
        },
        scale: {
          duration: 0.3,
          ease: 'backOut'
        }
      }
    },
    winner: {
      scale: 1.1,
      backgroundColor: '#ffd700',
      color: '#000000', // Черный текст для золотого фона
      textShadow: '0 0 15px hsla(51, 100%, 50%, 0.8)',
      boxShadow: '0 0 20px hsla(51, 100%, 50%, 0.6)',
      fontWeight: 700,
      zIndex: 2,
      rotate: [0, -3, 3, -3, 3, 0],
      transition: {
        duration: 0.5,
        rotate: {
          duration: 0.5,
          repeat: 3,
          ease: 'easeInOut'
        }
      }
    },
    animating: {
      scale: [1, 1.15, 1],
      rotate: [-1, 1, -1],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.8,
        ease: 'easeInOut'
      },
    },
  };

  /**
   * Определяет текущее состояние анимации карточки
   * @returns {string} Название состояния анимации
   */
  const getAnimationState = () => {
    if (props.$isWinner) return 'winner';
    if (props.$isHighlighted) return 'highlighted';
    if (props.$isAnimating) return 'animating';
    return 'normal';
  };

  return (
    <StyledCard
      key={`${props.$isHighlighted}-${props.$isWinner}-${props.$isAnimating}`}
      variants={variants}
      initial="normal"
      animate={getAnimationState()}
      data-winner={props.$isWinner}
      {...props}
    >
      {children}
    </StyledCard>
  );
};
