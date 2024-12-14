import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ isLoading, children, className, ...props }) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};

export default Button;
