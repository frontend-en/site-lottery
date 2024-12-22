import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components';

const HomePage: React.FC = () => {
  return (
    <Layout sidebar={false}>
      <h2 className="text-2xl font-bold">Готовы испытать удачу?</h2>
      <p className="mt-2">
        Присоединяйтесь к нам прямо сейчас и начните выигрывать!
      </p>
      <section className="mt-4">
        <h1>Музикальные группы</h1>
        <ul>
          <li><Link to="/lotteries/1">Группа 1</Link></li>
          <li><Link to="/lotteries/2">Группа 2</Link></li>
          <li><Link to="/lotteries/3">Группа 3</Link></li>
        </ul>
      </section>
    </Layout>
  );
};

export default HomePage;
