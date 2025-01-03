import React from 'react';
import { Layout } from '../app/layout';

const LotteriesPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold">Лотереи</h1>
        <p>Участвуйте в актуальных лотереях и выигрывайте призы!</p>
        <button className="btn btn-primary mt-4">Зарегистрироваться</button>
      </div>
    </Layout>
  );
};

export default LotteriesPage;
