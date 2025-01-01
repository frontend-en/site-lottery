import { FC, useEffect, useState, useCallback } from 'react';
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
  onResult?: (result: string) => void;
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  place-items: center;
  
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

const ResultContainer = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin-top: 1rem;
  width: 100%;
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-success);
`;

const PromoCode = styled.div`
  font-family: monospace;
  font-size: 1rem;
  padding: 0.5rem;
  background: var(--color-base-200);
  border-radius: 4px;
  display: inline-block;
  margin-top: 0.5rem;
`;

export const LotteryWheel: FC<LotteryWheelProps> = ({ items, spinSpeed, onResult }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [winningItem, setWinningItem] = useState<typeof items[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setWinningItem(null);

    let lastIndex = -1;
    const animationDuration = 5000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < animationDuration) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * items.length);
        } while (newIndex === lastIndex);
        
        lastIndex = newIndex;
        setHighlightedIndex(newIndex);
        
        const speed = Math.max(50, 200 * (1 - elapsed / animationDuration));
        setTimeout(() => requestAnimationFrame(animate), speed);
      } else {
        const winner = items.find(item => item.isWinner);
        setHighlightedIndex(winner?.index || 0);
        setWinningItem(winner || null);
        setIsAnimating(false);
        onResult?.(winner?.item || items[0].item);
      }
    };

    requestAnimationFrame(animate);
  }, [items, isAnimating, onResult]);

  useEffect(() => {
    if (spinSpeed !== 'NONE') {
      startAnimation();
    }
  }, [spinSpeed, startAnimation]);

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

      {winningItem && (
        <ResultContainer>
          <ResultTitle>Поздравляем!</ResultTitle>
          <div>Вы выиграли: {winningItem.item}</div>
          <PromoCode>PROMO-{Math.random().toString(36).substring(2, 8).toUpperCase()}</PromoCode>
        </ResultContainer>
      )}
    </Container>
  );
};