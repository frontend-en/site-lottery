import React from 'react';
import { Layout } from '../app/layout';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p>Измените параметры вашего профиля и предпочтений.</p>
        <button className="btn btn-primary mt-4">Зарегистрироваться</button>
      </div>
    </Layout>
  );
};

export default SettingsPage;
