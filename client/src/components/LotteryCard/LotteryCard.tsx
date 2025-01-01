import { FC, memo, useState } from 'react';
import OptimizedImage from '../../shared/UI/OptimizedImage';
import { Button } from '../../shared';
import { LotteryPopup } from '../LotteryPopup/LotteryPopup';

interface LotteryCardProps {
  id: string;
  bandName: string;
  concertDate: string;
  imageUrl: string;
  webpImageUrl?: string;
  ticketPrice: number;
  priority?: boolean;
}

const LotteryCard: FC<LotteryCardProps> = ({
  id,
  bandName,
  concertDate,
  imageUrl,
  webpImageUrl,
  ticketPrice,
  priority = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formattedDate = new Date(concertDate).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article
      className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      itemScope
      itemType="https://schema.org/Event"
      data-testid="lottery-card"
    >
      <figure className="relative h-48 sm:h-56 md:h-64">
        <OptimizedImage
          src={imageUrl}
          webpSrc={webpImageUrl}
          alt={`Концерт группы ${bandName}`}
          className="w-full h-full object-cover"
          width={800}
          height={600}
          itemProp="image"
          priority={priority}
        />
        <div
          className="absolute top-4 right-4 badge badge-secondary p-3"
          aria-label={`Стоимость билета: ${ticketPrice} рублей`}
        >
          Билет: {ticketPrice} ₽
        </div>
      </figure>

      <div className="card-body p-4 sm:p-6">
        <h2
          className="card-title text-xl sm:text-2xl font-bold"
          itemProp="name"
        >
          {bandName}
        </h2>
        <p
          className="text-sm sm:text-base text-base-content/70"
        >
          <span className="sr-only">Дата проведения концерта:</span>
          <span itemProp="startDate" content={concertDate}>
            Дата концерта: {formattedDate}
          </span>
        </p>

        <div className="mt-4 space-y-3">
          <div
            className="bg-base-200 p-3 sm:p-4 rounded-lg"
            role="complementary"
            aria-label="Информация о розыгрыше"
          >
            <p
              className="text-center font-semibold text-primary text-sm sm:text-base"
              itemProp="description"
            >
              Выиграй бесплатный билет на концерт!
            </p>
          </div>

          <div className="card-actions">
            <Button
              className="btn btn-primary w-full"
              aria-label={`Участвовать в розыгрыше билетов на концерт группы ${bandName}`}
              role="button"
              onClick={() => setIsPopupOpen(true)}
            >
              Участвовать в розыгрыше
            </Button>
          </div>
        </div>

        <LotteryPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          bandName={bandName}
        />

        <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
          <span itemProp="price" content={String(ticketPrice)}></span>
          <span itemProp="priceCurrency" content="RUB"></span>
          <meta itemProp="url" content={`/lotteries/${id}`} />
        </div>
      </div>
    </article>
  );
};

export default memo(LotteryCard);
