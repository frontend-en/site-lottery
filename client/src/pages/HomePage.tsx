import React from 'react';
import { Layout } from '../components';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold">Готовы испытать удачу?</h2>
      <p className="mt-2">
        Присоединяйтесь к нам прямо сейчас и начните выигрывать!
      </p>
      <button className="btn btn-primary mt-4">Зарегистрироваться</button>
    </Layout>
  );
};

export default HomePage;
