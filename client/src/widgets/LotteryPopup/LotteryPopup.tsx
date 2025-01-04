import { FC, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LotteryWheel, WHEEL_ANIMATION_DURATION, SpinSpeed } from '../../shared/UI/LotteryWheel';
import { spinTracker } from '../../shared/UI/LotteryWheel/services/spinTracker';
import { Button, Modal } from '../../shared';
import { PRIZES, FAILS } from './constants';
import { ResultDisplay } from './components/ResultDisplay';

interface LotteryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bandName: string;
}

interface LotteryResult {
  item: string;
  promo?: string;
}

/**
 * Компонент всплывающего окна с лотереей
 */
export const LotteryPopup: FC<LotteryPopupProps> = ({ isOpen, onClose, bandName }) => {
  // Состояние скорости вращения колеса
  const [spinSpeed, setSpinSpeed] = useState<SpinSpeed>('NONE');
  // Результат вращения
  const [result, setResult] = useState<LotteryResult | null>(null);
  // Флаг отображения результата
  const [showResult, setShowResult] = useState(false);
  // Флаг выигрышного вращения (каждое 25-е)
  const [isWinningTurn, setIsWinningTurn] = useState(false);

  // Сброс состояния при закрытии окна
  const resetState = useCallback(() => {
    setSpinSpeed('NONE');
    setShowResult(false);
    setResult(null);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  // Получить случайное сообщение о неудаче
  const getRandomFail = () => {
    const randomIndex = Math.floor(Math.random() * FAILS.length);

    return FAILS[randomIndex];
  };

  // Формируем элементы колеса
  const items = Array.from({ length: 16 }, (_, index) => {
    // Если это выигрышное вращение и элемент в первых 8 позициях - это приз
    const isWinner = isWinningTurn && index < PRIZES.length;
    const item = isWinner ? PRIZES[index] : getRandomFail();

    return {
      id: index.toString(),
      item,
      index,
      isWinner,
    };
  });

  // Обработчик нажатия на кнопку вращения
  const handleSpin = useCallback(() => {
    // Проверяем, является ли это вращение выигрышным (каждое 25-е)
    const isWinning = spinTracker.spin();

    setIsWinningTurn(isWinning);
    setSpinSpeed('FAST');
    setShowResult(false);

    // Останавливаем вращение через заданное время
    setTimeout(() => {
      setSpinSpeed('NONE');
      setShowResult(true);
    }, WHEEL_ANIMATION_DURATION.TOTAL);
  }, []);

  // Обработчик получения результата от колеса
  const handleResult = useCallback((newResult: LotteryResult) => {
    setResult(newResult);
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

        <div className="flex-1 w-full">
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

        {showResult && result && (
          <ResultDisplay
            result={result}
            bandName={bandName}
            onClose={onClose}
          />
        )}
      </motion.div>
    </Modal>
  );
};
