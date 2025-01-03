import { FC } from 'react';
import { Layout } from '../app/layout';
import { LotteryGrid } from '../widgets/LotteryCard';

const HomePage: FC = () => {
  return (
    <Layout sidebar={false}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Готовы испытать удачу?</h2>
        <p className="text-xl text-base-content/70">
          Выиграйте бесплатные билеты на концерты ваших любимых групп!
        </p>
      </div>

      <LotteryGrid />
    </Layout>
  );
};

export default HomePage;
