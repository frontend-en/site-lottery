import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpinSpeed } from './consts';
import { Card } from './Card';
import { LotteryItem, shuffleArray, generatePromoCode, findOrRandomWinner } from './utils';

interface LotteryWheelProps {
  items: LotteryItem[];
  spinSpeed: SpinSpeed;
  onResult?: (result: { item: string; promo?: string }) => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  place-items: center;
  max-width: 900px;
  margin: 0 auto;
  
  @media (min-width: 641px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

export const LotteryWheel: FC<LotteryWheelProps> = ({ items, spinSpeed, onResult }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [winningItem, setWinningItem] = useState<LotteryItem | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (spinSpeed === 'FAST') {
      setStartAnimation(true);
      setWinningItem(null);
    }
  }, [spinSpeed]);

  useEffect(() => {
    if (!startAnimation) return;

    let currentShuffledIndices = shuffleArray(items.map((_, index) => index));
    let currentPosition = 0;

    const interval = setInterval(() => {
      if (currentPosition >= items.length) {
        currentShuffledIndices = shuffleArray(items.map((_, index) => index));
        currentPosition = 0;
      }

      setHighlightedIndex(currentShuffledIndices[currentPosition]);
      currentPosition++;
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      const winner = findOrRandomWinner(items);
      
      setHighlightedIndex(winner.index);
      setWinningItem(winner);
      onResult?.({
        item: winner.item,
        ...(winner.isWinner && { promo: generatePromoCode() })
      });
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