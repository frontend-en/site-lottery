export interface LotteryItem {
  id: string;
  item: string;
  index: number;
  isWinner: boolean;
}

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const generatePromoCode = (): string => 
  `PROMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export const findOrRandomWinner = (items: LotteryItem[]): LotteryItem => 
  items.find(item => item.isWinner) || items[Math.floor(Math.random() * items.length)];
