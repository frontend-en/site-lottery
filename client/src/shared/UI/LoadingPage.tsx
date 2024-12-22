import { FC } from 'react';

interface LoadingPageProps {
  title?: string;
}

const LoadingPage: FC<LoadingPageProps> = ({
  title = 'Загрузка страницы...'
}) => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center space-y-4 animate-pulse">
      <div className="mt-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <p className="text-base-content/70">{title}</p>
    </div>
  );
};

export default LoadingPage;
