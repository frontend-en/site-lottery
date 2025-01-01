import { FC, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../../shared/UI/Modal';
import { LotteryWheel, WHEEL_ANIMATION_DURATION, SpinSpeed, WIN_PROBABILITY } from '../../shared/UI/LotteryWheel';
import { Button } from '../../shared';

interface LotteryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bandName: string;
}

const prizes = [
  'Скидка 10% на билет',
  'Скидка 15% на билет',
  'Скидка 20% на билет',
  'Бесплатный напиток на концерте',
  'VIP-место на концерте',
  'Meet&Greet с группой',
  'Эксклюзивный мерч',
  'Автограф-сессия',
];

const fails = [
  'Может в следующий раз повезёт!',
  'Удача любит настойчивых',
  'Ты был близок!',
  'Попробуй ещё разок',
  'Почти получилось!',
  'В следующий раз точно повезёт',
  'Не отчаивайся, крути снова',
  'Музыка всё равно с тобой',
];

export const LotteryPopup: FC<LotteryPopupProps> = ({ isOpen, onClose, bandName }) => {
  const [spinSpeed, setSpinSpeed] = useState<SpinSpeed>('NONE');
  const [finalResult, setFinalResult] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSpinSpeed('NONE');
      setShowResult(false);
      setFinalResult('');
    }
  }, [isOpen]);

  const items = [...prizes, ...fails].map((item, index) => ({
    id: index.toString(),
    item,
    index,
    isWinner: prizes.includes(item) && Math.random() < WIN_PROBABILITY,
  }));

  const handleSpin = () => {
    setSpinSpeed('FAST');
    setShowResult(false);
    
    setTimeout(() => {
      setSpinSpeed('NONE');
      setShowResult(true);
    }, WHEEL_ANIMATION_DURATION.TOTAL);
  };

  const handleResult = useCallback((result: string) => {
    setFinalResult(result);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center gap-4 p-4 max-w-[90vw] max-h-[90vh] overflow-y-auto"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold">Испытайте удачу!</h2>
          <p className="text-lg mt-2 text-base-content/80">{bandName}</p>
        </div>
        
        <div className="flex-1 w-full overflow-hidden">
          <LotteryWheel
            items={items}
            spinSpeed={spinSpeed}
            onResult={handleResult}
          />
        </div>

        {!showResult && (
          <Button
            className="btn btn-primary"
            onClick={handleSpin}
            disabled={spinSpeed !== 'NONE'}
          >
            Крутить
          </Button>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
          >
            <h3 className="text-xl font-bold mb-4">
              {prizes.includes(finalResult) ? 'Поздравляем!' : 'Не расстраивайся!'}
            </h3>
            <p className={`text-lg font-medium mb-4 ${prizes.includes(finalResult) ? 'text-success' : ''}`}>
              {finalResult}
            </p>
            {prizes.includes(finalResult) && (
              <p className="text-sm mb-4">
                Покажите этот экран при покупке билета на концерт {bandName}
              </p>
            )}
            <Button
              className="btn btn-primary w-full"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Modal>
  );
};
