import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../shared';
import { PRIZES } from '../constants';

interface ResultDisplayProps {
  result: { item: string; promo?: string };
  bandName: string;
  onClose: () => void;
}

export const ResultDisplay: FC<ResultDisplayProps> = ({ result, bandName, onClose }) => {
  const isWinner = PRIZES.includes(result.item as typeof PRIZES[number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold mb-4">
        {isWinner ? 'Поздравляем!' : 'Не расстраивайся!'}
      </h3>
      <p className={`text-lg font-medium mb-4 ${isWinner ? 'text-success' : ''}`}>
        {result.item}
      </p>
      {result.promo && (
        <div>
          <p className="text-base mb-2">Ваш промокод:</p>
          <p className="bg-base-300 p-2 rounded-md font-mono text-lg mb-4">
            {result.promo}
          </p>
          <p className="text-sm mb-4">
            Покажите этот экран при покупке билета на концерт {bandName}
          </p>
        </div>
      )}
      <Button
        className="btn btn-primary w-full"
        onClick={onClose}
      >
        Закрыть
      </Button>
    </motion.div>
  );
};
