import { FC } from 'react';

type LotteryCardProps = {
  title: string;
  description: string;
  image: string;
};

const lotteries = [
  {
    title: 'Супер Лото',
    description: 'Выиграйте до 10,000,000 рублей! Билеты от 100 рублей.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Моментальная Удача',
    description: 'Мгновенные призы до 500,000 рублей. Каждый билет выигрывает!',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Фортуна',
    description: 'Еженедельные розыгрыши с крупными призами!',
    image: 'https://via.placeholder.com/300x200',
  },
];

const LotteryCard: FC<LotteryCardProps> = ({ title, description, image }) => {
  return (
    <div className="card bg-base-200 shadow-md max-w-56">
      <figure>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Участвовать</button>
        </div>
      </div>
    </div>
  );
};

export default LotteryCard;
