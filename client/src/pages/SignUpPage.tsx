import { FC, lazy } from 'react';
import { Layout } from '../app/layout';
import RegForm from '../features/auth/RegForm/RegForm';
// Ленивая загрузка компонентов
const AnimatedPage = lazy(() =>
  import('../app/providers/router/AnimatedPage').then(module => ({ default: module.default }))
);

const SignUpPage: FC = () => {
  return (
    <Layout sidebar={false}>
      <AnimatedPage>
        <RegForm />
      </AnimatedPage>
    </Layout>
  );
};

export default SignUpPage;
