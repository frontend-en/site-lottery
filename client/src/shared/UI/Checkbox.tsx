import { FC, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // Текст метки
}

const Checkbox: FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className={`checkbox ${className || 'checkbox-primary'}`}
          {...props}
        />
        <span className="label-text ml-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
