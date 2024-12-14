import { FC, ReactNode } from 'react';

interface FormControlProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const FormControl: FC<FormControlProps> = ({ label, children, className }) => {
  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
};

export default FormControl;
