import React from 'react';
import { Layout } from '../components';

const PrizesPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold">Призы</h1>
        <p>Просмотрите список доступных призов и выигрышей.</p>
        <button className="btn btn-primary mt-4">Зарегистрироваться</button>
      </div>
    </Layout>
  );
};

export default PrizesPage;
