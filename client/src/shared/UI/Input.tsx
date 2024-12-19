import { FC, useState } from 'react';
import { InputHTMLAttributes } from 'react';
import { closePass, showPassword } from '../assets';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input: FC<InputProps> = ({ isError, className, type, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isPasswordField = type === 'password';

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={isPasswordField && isPasswordVisible ? 'text' : type}
        className={`input input-bordered w-full ${isError ? 'input-error' : ''} ${className || ''}`}
      />
      {isPasswordField && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={handleToggleVisibility}
        >
          {isPasswordVisible ? (
            <img src={showPassword} />
          ) : (
            <img src={closePass} />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
