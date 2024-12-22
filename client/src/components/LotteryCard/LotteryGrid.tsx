import { FC } from 'react';
import LotteryCard from './LotteryCard';
import { DMImage, AXImage, PTAImage } from '../../assets';

// дописать бекенд
const lotteries = [
  {
    id: '1',
    bandName: 'Танцы Сознания',
    concertDate: '2024-01-15',
    imageUrl: DMImage,
    ticketPrice: 2500,
  },
  {
    id: '2',
    bandName: 'AsperX',
    concertDate: '2024-01-22',
    imageUrl: AXImage,
    ticketPrice: 2000,
  },
  {
    id: '3',
    bandName: 'Playingtheangel',
    concertDate: '2024-01-29',
    imageUrl: PTAImage,
    ticketPrice: 2200,
  },
];

const LotteryGrid: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {lotteries.map((lottery) => (
        <LotteryCard
          key={lottery.id}
          {...lottery}
        />
      ))}
    </div>
  );
};

export default LotteryGrid;
