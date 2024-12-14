import React, { FC } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`card w-96 bg-base-100 shadow-xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Card;
