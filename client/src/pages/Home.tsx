import React from 'react';
import { Layout } from '../components';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Добро пожаловать в Удачка!</h1>
      <p className="mt-4">
        Примите участие в лотереях и выигрывайте ценные призы!
      </p>
    </Layout>
  );
};

export default Home;
