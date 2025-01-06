import { FC, useCallback, useMemo } from 'react';
import { LotteryWheel } from '../../shared/UI/LotteryWheel';
import { Button, Modal } from '../../shared';
import { PRIZES, FAILS } from './constants';
import { ResultDisplay } from './components/ResultDisplay';
import { memo } from 'react';
import useLotteryState from './hooks/useLotteryState';
import { shuffleArray } from './utiles';

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

export const LotteryPopup: FC<LotteryPopupProps> = memo(({ isOpen, onClose, bandName }) => {
  const { spinSpeed, result, showResult, isWinningTurn, handleSpin, setResult } = useLotteryState(isOpen);


  const items = useMemo(() => shuffleArray([
    ...PRIZES.map((prize, index) => ({
      id: `prize-${index}`,
      item: prize,
      index,
      isWinner: isWinningTurn
    })),
    ...FAILS.map((fail, index) => ({
      id: `fail-${index}`,
      item: fail,
      index: PRIZES.length + index,
      isWinner: false
    }))
  ]), []);

  const handleResult = useCallback((newResult: LotteryResult) => {
    setResult(newResult);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
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
      </div>
    </Modal>
  );
});
