export const handlePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

export const handleValidation = (formState:any, setErrors:any) => {
  const newErrors: { [key: string]: string | null } = {};
  if (!validateEmail(formState.email)) newErrors.email = 'Введите корректный email';
  if (!validatePassword(formState.password)) {
    newErrors.password =
      'Пароль должен быть не менее 8 символов, содержать хотя бы одну заглавную букву, одну строчную букву и цифру';
  }
  if (formState.password !== formState.confirmPassword) {
    newErrors.confirmPassword = 'Пароли не совпадают';
  }
  if (!validateFullName(formState.fullName)) newErrors.fullName = 'Введите корректное имя';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

export const validateFullName = (name: string): boolean => name.trim().length >= 2;
