// Базовые компоненты
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as LoadingPage } from './LoadingPage';

// Динамически импортируемые компоненты
export const ErrorMessage = () => import('./ErrorMessage').then(m => m.default);
export const FormControl = () => import('./FormControl').then(m => m.default);
export const ProgressBar = () => import('./ProgressBar').then(m => m.default);