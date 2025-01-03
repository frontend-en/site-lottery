import React from 'react';
import { Layout } from '../app/layout';
import RegForm from '../features/auth/RegForm/RegForm';

const SignUpPage: React.FC = () => {
  return (
    <Layout sidebar={false}>
      <RegForm />
    </Layout>
  );
};

export default SignUpPage;
