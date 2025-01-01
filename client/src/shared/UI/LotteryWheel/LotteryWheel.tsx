import { FC, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { SpinSpeed } from './consts';

interface LotteryWheelProps {
  items: Array<{
    id: string;
    item: string;
    index: number;
    isWinner: boolean;
  }>;
  spinSpeed: SpinSpeed;
  onResult?: (result: { item: string; promo?: string }) => void;
}

const glow = keyframes`
  0% {
    box-shadow: 0 0 20px var(--color-primary);
    transform: scale(1.05);
  }
  50% {
    box-shadow: 0 0 10px var(--color-primary);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 20px var(--color-primary);
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.2rem;
  place-items: center;
  overflow-y: auto;
  
  @media (min-width: 640px) {
    gap: 0.75rem;
  }
`;

const Card = styled.div<{ $isHighlighted: boolean; $isWinner: boolean }>`
  background: ${props => props.$isWinner ? 'var(--color-success)' : 'var(--color-base-100)'};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  word-break: break-word;

  ${props => props.$isHighlighted && css`
    animation: ${glow} 0.5s ease-in-out infinite;
    z-index: 1;
  `}

  ${props => !props.$isHighlighted && !props.$isWinner && css`
    opacity: 0.6;
  `}
`;

export const LotteryWheel: FC<LotteryWheelProps> = ({ items, spinSpeed, onResult }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [winningItem, setWinningItem] = useState<typeof items[0] | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (spinSpeed === 'FAST') {
      setStartAnimation(true);
      setWinningItem(null);
    }
  }, [spinSpeed]);

  useEffect(() => {
    if (!startAnimation) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setHighlightedIndex(currentIndex);
      currentIndex = (currentIndex + 1) % items.length;
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      const winner = items.find(item => item.isWinner) || items[Math.floor(Math.random() * items.length)];
      setHighlightedIndex(winner.index);
      setWinningItem(winner);
      
      const result = {
        item: winner.item,
        ...(winner.isWinner && { promo: `PROMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}` })
      };
      
      onResult?.(result);
      setStartAnimation(false);
    }, 5000 - 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [items, onResult, startAnimation]);

  return (
    <Container>
      <Grid>
        {items.map((item) => (
          <Card
            key={item.id}
            $isHighlighted={highlightedIndex === item.index}
            $isWinner={winningItem?.id === item.id}
          >
            {item.item}
          </Card>
        ))}
      </Grid>
    </Container>
  );
};