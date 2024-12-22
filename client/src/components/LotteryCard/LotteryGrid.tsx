import { FC, memo } from 'react';
import LotteryCard from './LotteryCard';
import {
  DMImage,
  AXImage,
  PTAImage,
  DMImageWebp,
  AXImageWebp,
  PTAImageWebp,
  AmatoryImage,
  AnacondazImage,
  LounaImage,
  PornoFilmyImage,
  PsikheaImage,
  SlotImage,
  SeverFlotImage,
  StigmataImage,
  WildWaysImage,
  OrigamiImage,
  AmatoryImageWebp,
  AnacondazImageWebp,
  LounaImageWebp,
  PornoFilmyImageWebp,
  PsikheaImageWebp,
  SlotImageWebp,
  SeverFlotImageWebp,
  StigmataImageWebp,
  WildWaysImageWebp,
  OrigamiImageWebp
} from '../../assets';

// дописать бекенд
const lotteries = [
  {
    id: '1',
    bandName: 'Танцы Сознания',
    concertDate: '2024-01-15',
    imageUrl: DMImage,
    webpImageUrl: DMImageWebp,
    ticketPrice: 2500,
  },
  {
    id: '2',
    bandName: 'AsperX',
    concertDate: '2024-01-22',
    imageUrl: AXImage,
    webpImageUrl: AXImageWebp,
    ticketPrice: 2000,
  },
  {
    id: '3',
    bandName: 'Playingtheangel',
    concertDate: '2024-01-29',
    imageUrl: PTAImage,
    webpImageUrl: PTAImageWebp,
    ticketPrice: 2200,
  },
  {
    id: '4',
    bandName: 'Северный Флот',
    concertDate: '2024-02-05',
    imageUrl: SeverFlotImage,
    webpImageUrl: SeverFlotImageWebp,
    ticketPrice: 2800,
  },
  {
    id: '5',
    bandName: 'Stigmata',
    concertDate: '2024-02-12',
    imageUrl: StigmataImage,
    webpImageUrl: StigmataImageWebp,
    ticketPrice: 2300,
  },
  {
    id: '6',
    bandName: 'Amatory',
    concertDate: '2024-02-19',
    imageUrl: AmatoryImage,
    webpImageUrl: AmatoryImageWebp,
    ticketPrice: 2600,
  },
  {
    id: '7',
    bandName: 'Психея',
    concertDate: '2024-02-26',
    imageUrl: PsikheaImage,
    webpImageUrl: PsikheaImageWebp,
    ticketPrice: 2100,
  },
  {
    id: '8',
    bandName: 'Слот',
    concertDate: '2024-03-04',
    imageUrl: SlotImage,
    webpImageUrl: SlotImageWebp,
    ticketPrice: 2400,
  },
  {
    id: '9',
    bandName: 'Louna',
    concertDate: '2024-03-11',
    imageUrl: LounaImage,
    webpImageUrl: LounaImageWebp,
    ticketPrice: 2700,
  },
  {
    id: '10',
    bandName: 'Порнофильмы',
    concertDate: '2024-03-18',
    imageUrl: PornoFilmyImage,
    webpImageUrl: PornoFilmyImageWebp,
    ticketPrice: 2200,
  },
  {
    id: '11',
    bandName: 'Anacondaz',
    concertDate: '2024-03-25',
    imageUrl: AnacondazImage,
    webpImageUrl: AnacondazImageWebp,
    ticketPrice: 2500,
  },
  {
    id: '12',
    bandName: 'Wildways',
    concertDate: '2024-04-01',
    imageUrl: WildWaysImage,
    webpImageUrl: WildWaysImageWebp,
    ticketPrice: 2300,
  },
  {
    id: '13',
    bandName: 'Origami',
    concertDate: '2024-04-08',
    imageUrl: OrigamiImage,
    webpImageUrl: OrigamiImageWebp,
    ticketPrice: 2100,
  }
];

const LotteryGrid: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {lotteries.map((lottery, index) => (
        <LotteryCard
          key={lottery.id}
          {...lottery}
          priority={index < 3} // Приоритетная загрузка первых трёх изображений
        />
      ))}
    </div>
  );
};

export default memo(LotteryGrid);
