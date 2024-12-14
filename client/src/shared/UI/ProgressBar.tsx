import { FC } from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, max, label, className }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClass = () => {
    if (percentage <= 20) return 'bg-red-600';
    if (percentage <= 40) return 'bg-orange-500';
    if (percentage <= 60) return 'bg-yellow-400';
    if (percentage <= 80) return 'bg-green-500';
    return 'bg-blue-600';
  };

  return (
    <div className={`w-full ${className || ''}`}>
      {label && <div className="text-sm mb-1">{label}</div>}
      <div className="relative w-full bg-gray-300 rounded overflow-hidden h-2">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-300 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
