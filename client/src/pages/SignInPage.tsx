import React from 'react';
import { Layout } from '../app/layout';
import AuthForm from '../features/auth/AuthForm/AuthForm';

const SignInPage: React.FC = () => {
  return (
    <Layout sidebar={false}>
      <AuthForm />
    </Layout>
  );
};

export default SignInPage;
