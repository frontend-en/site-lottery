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
  min-width: 100%;
  aspect-ratio: 1;
  background: oklch(var(--b2));
  border: 1px solid oklch(var(--a));
  border-radius: clamp(0.5rem, 2vw, 0.75rem);
  padding: clamp(0.5rem, 1.5vw, 0.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: default;
  user-select: none;
  font-size: 1rem;
  line-height: 1.2;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 
    0 4px 6px -1px oklch(var(--b1) / 0.1), 
    0 2px 4px -2px oklch(var(--b1) / 0.1);

  /* Контейнер для текста */
  & > * {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  /* Адаптивные стили */
  @media (max-width: 640px) {
    font-size: 0.675rem;
    line-height: 1.1;
    min-height: 60px;
    max-height: 60px;
    max-width: 60px;
    margin: 0 auto;
    padding: 0.25rem;
    border-radius: 0.375rem;

    & > * {
      -webkit-line-clamp: 3;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    font-size: 0.75rem;
    line-height: 1.2;
    min-height: 80px;
    max-height: 80px;
    max-width: 80px;
    margin: 0 auto;
    padding: 0.375rem;
    border-radius: 0.5rem;

    & > * {
      -webkit-line-clamp: 4;
    }
  }

  @media (min-width: 1025px) {
    min-height: 120px;
    max-height: 120px;
    max-width: 120px;
    margin: 0 auto;

    & > * {
      -webkit-line-clamp: 5;
    }
  }

  /* Hover эффекты */
  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 
        0 6px 8px -2px oklch(var(--b1) / 0.12), 
        0 4px 6px -2px oklch(var(--b1) / 0.1);
    }
  }

  /* Выигрышная карточка */
  &[data-winner="true"] {
    background: linear-gradient(135deg, 
      oklch(85% 0.2 80) 0%, 
      oklch(75% 0.25 60) 50%, 
      oklch(65% 0.3 40) 100%
    );
    border: none;
    color: oklch(var(--b1));
    text-shadow: 0 1px 2px oklch(0% 0 0 / 0.1);
    box-shadow: 
      0 0 20px oklch(85% 0.2 80 / 0.3),
      0 10px 15px -3px oklch(0% 0 0 / 0.2),
      0 4px 6px -4px oklch(0% 0 0 / 0.1);
    
    @media (max-width: 640px) {
      box-shadow: 
        0 0 15px oklch(85% 0.2 80 / 0.3),
        0 8px 12px -3px oklch(0% 0 0 / 0.2);
    }
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
    background: 'oklch(80% 0.2 80)',  // Золотой
    glow: 'oklch(80% 0.2 80 / 0.6)'
  },
  {
    background: 'oklch(75% 0.25 330)',  // Розовый
    glow: 'oklch(75% 0.25 330 / 0.6)'
  },
  {
    background: 'oklch(75% 0.2 200)',  // Бирюзовый
    glow: 'oklch(75% 0.2 200 / 0.6)'
  },
  {
    background: 'oklch(70% 0.25 280)',  // Фиолетовый
    glow: 'oklch(70% 0.25 280 / 0.6)'
  },
  {
    background: 'oklch(75% 0.25 30)',   // Коралловый
    glow: 'oklch(75% 0.25 30 / 0.6)'
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
      boxShadow: '0 4px 6px -1px oklch(var(--b1) / 0.1), 0 2px 4px -2px oklch(var(--b1) / 0.1)',
      fontWeight: 400,
      zIndex: 0,
    },
    highlighted: {
      scale: 1.05,
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
          duration: 2,
          ease: 'easeInOut'
        },
        textShadow: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut'
        },
        boxShadow: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut'
        },
        rotate: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1.2,
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
      backgroundColor: 'oklch(85% 0.2 80)',
      color: 'oklch(var(--b1))', // Черный текст для золотого фона
      textShadow: '0 0 15px oklch(85% 0.2 80 / 0.8)',
      boxShadow: '0 0 20px oklch(85% 0.2 80 / 0.6)',
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
      scale: [1, 1.1, 1],
      rotate: [-1, 1, -1],
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1.2,
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

export default Card;
