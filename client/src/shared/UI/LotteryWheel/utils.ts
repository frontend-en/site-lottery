export interface LotteryItem {
  id: string;
  item: string;
  index: number;
  isWinner: boolean;
}


export const generatePromoCode = (): string => 
  `PROMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
