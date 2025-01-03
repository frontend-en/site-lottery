import { FC, lazy } from 'react';
import { Layout } from '../app/layout';
import AuthForm from '../features/auth/AuthForm/AuthForm';

// Ленивая загрузка компонентов
const AnimatedPage = lazy(() =>
  import('../app/providers/router/AnimatedPage').then(module => ({ default: module.default }))
);

const SignInPage: FC = () => {
  return (
    <Layout sidebar={false}>
      <AnimatedPage>
        <AuthForm />
      </AnimatedPage>
    </Layout>
  );
};

export default SignInPage;
