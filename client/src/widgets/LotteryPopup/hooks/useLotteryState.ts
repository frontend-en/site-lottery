import { useCallback, useEffect, useState } from 'react';
import { SpinSpeed } from '../../../shared/UI/LotteryWheel';
import { spinTracker } from '../../../shared/UI/LotteryWheel/services/spinTracker';
import { WHEEL_ANIMATION_DURATION } from '../../../shared/UI/LotteryWheel';

interface LotteryResult {
  item: string;
  promo?: string;
}

const useLotteryState = (isOpen: boolean) => {
  const [spinSpeed, setSpinSpeed] = useState<SpinSpeed>('NONE');
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isWinningTurn, setIsWinningTurn] = useState(false);

  const resetState = useCallback(() => {
    setSpinSpeed('NONE');
    setShowResult(false);
    setResult(null);
    setIsWinningTurn(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  const handleSpin = useCallback(() => {
    const isWinning = spinTracker.spin();

    setIsWinningTurn(isWinning);
    setSpinSpeed('FAST');
    setShowResult(false);

    setTimeout(() => {
      setSpinSpeed('NONE');
      setShowResult(true);
    }, WHEEL_ANIMATION_DURATION.TOTAL);
  }, []);

  return { spinSpeed, result, showResult, isWinningTurn, handleSpin, setResult };
};

export default useLotteryState;
