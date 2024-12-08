import React, { useState } from 'react';
import { useRegisterMutation } from '../../store/services/api/auth/authApi';
// KuydffxsHktjL7UpKT cheesecheesson@gmail.com
const RegForm: React.FC = () => {
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

  const handlePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleValidation = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!validateEmail(formState.email))
      newErrors.email = 'Введите корректный email';
    if (!validatePassword(formState.password)) {
      newErrors.password =
        'Пароль должен быть не менее 8 символов, содержать хотя бы одну заглавную букву, одну строчную букву и цифру';
    }
    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!validateFullName(formState.fullName))
      newErrors.fullName = 'Введите корректное имя';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean =>
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const validateFullName = (name: string): boolean => name.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

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
    <div className="card w-96 bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title justify-center">Регистрация</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Полное имя <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Введите полное имя"
              value={formState.fullName}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
              required
            />
            {errors.fullName && (
              <span className="text-error mt-1">{errors.fullName}</span>
            )}
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">
                Email <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Введите email"
              value={formState.email}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              required
            />
            {errors.email && (
              <span className="text-error mt-1">{errors.email}</span>
            )}
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">
                Пароль <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formState.password}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              required
            />
            {errors.password && (
              <span className="text-error mt-1">{errors.password}</span>
            )}

            <div className="mt-2">
              <span className="text-sm">{`Надежность пароля: ${['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Сильный'][passwordStrength - 1] || ''}`}</span>
              <progress
                className="progress progress-primary w-full"
                value={passwordStrength}
                max="5"
              ></progress>
            </div>
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">
                Повторите пароль <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formState.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
              required
            />
            {errors.confirmPassword && (
              <span className="text-error mt-1">{errors.confirmPassword}</span>
            )}
          </div>

          {isError && (
            <div className="text-error mt-2">
              Ошибка регистрации:{' '}
              {(error as any)?.data?.message || 'Неизвестная ошибка'}
            </div>
          )}

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegForm;
