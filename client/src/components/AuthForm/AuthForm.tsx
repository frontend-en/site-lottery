import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../store/services/api/auth/authApi';
import { Card, FormControl, Input, ErrorMessage, Button, Checkbox } from '../../shared';

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      console.log('Авторизация успешна:', response.token);
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  };

  return (
    <Card>
      <div className="card-body">
        <h2 className="card-title justify-center">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <FormControl label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Введите email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl label="Пароль" className="mt-4">
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl className="mt-4">
            <Checkbox
              label="Запомнить меня"
              name="rememberMe"
              labelPosition='justify-start'
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="mb-4 text-end">
            <Link to="/forgot-password">Забыли пароль?</Link>
          </FormControl>
          <ErrorMessage message={isError ? (error as any)?.data?.message || 'Неизвестная ошибка' : undefined} />
          <FormControl className="my-4">
            <Button type="submit" isLoading={isLoading}>
              Войти
            </Button>
          </FormControl>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;



/*
  {
  "email": "kristinarwebdev@gmail.com",
  "password": "password123kristinarwebdev",
  "full_name": "kristinarwebdev"
}
  */
