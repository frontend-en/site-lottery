import React from 'react';
import { RegForm, Layout } from '../components';

const SignUpPage: React.FC = () => {
  return (
    <Layout sidebar={false}>
      <RegForm />
    </Layout>
  );
};

export default SignUpPage;
