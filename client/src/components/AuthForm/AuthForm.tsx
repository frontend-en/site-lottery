import React, { useState } from 'react';
import { useLoginMutation } from '../../store/services/api/auth/authApi';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log('Авторизация успешна:', response.token);
      // Сохраните токен или выполните дальнейшие действия
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Пароль</span>
            </label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          {isError && (
            <div className="text-error mt-2">
              Ошибка авторизации:{' '}
              {(error as any)?.data?.message || 'Неизвестная ошибка'}
            </div>
          )}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
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
