import { useState, FC } from 'react';
import { useRegisterMutation } from '../../../store/services/api/auth/authApi';
import { Card, FormControl, Input, Button, ErrorMessage, ProgressBar } from '../../../shared';
import { handlePasswordStrength, handleValidation } from './lib';

const RegForm: FC = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(handlePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation(formState, setErrors)) return;

    try {
      const response = await register({
        email: formState.email,
        password: formState.password,
        full_name: formState.fullName,
      }).unwrap();

      console.log('Регистрация успешна:', response);
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title justify-center">Регистрация</h2>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl label="Полное имя *">
            <Input
              type="text"
              name="fullName"
              placeholder="Введите полное имя"
              value={formState.fullName}
              onChange={handleChange}
              isError={!!errors.fullName}
              required
            />
            <ErrorMessage message={errors.fullName} />
          </FormControl>

          <FormControl label="Email *" className="mt-4">
            <Input
              type="email"
              name="email"
              placeholder="Введите email"
              value={formState.email}
              onChange={handleChange}
              isError={!!errors.email}
              required
            />
            <ErrorMessage message={errors.email} />
          </FormControl>

          <FormControl label="Пароль *" className="mt-4">
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formState.password}
              onChange={handleChange}
              isError={!!errors.password}
              required
            />
            <ErrorMessage message={errors.password} />
            <div className="mt-2">
              <ProgressBar
                value={passwordStrength}
                max={5}
                label={`Надежность пароля: ${['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Сильный'][passwordStrength - 1] || ''
                  }`}
              />
            </div>
          </FormControl>

          <FormControl label="Повторите пароль *" className="mt-4">
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formState.confirmPassword}
              onChange={handleChange}
              isError={!!errors.confirmPassword}
              required
            />
            <ErrorMessage message={errors.confirmPassword} />
          </FormControl>

          <ErrorMessage message={isError ? (error as any)?.data?.message || 'Неизвестная ошибка' : null} />
          <div className="form-control mt-6">
            <Button type="submit" isLoading={isLoading}>
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default RegForm;
