import React from 'react';
import { AuthForm, Layout } from '../components';

const SignInPage: React.FC = () => {
  return (
    <Layout sidebar={false}>
      <AuthForm />
    </Layout>
  );
};

export default SignInPage;
