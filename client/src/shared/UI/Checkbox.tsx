import { FC, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // Текст метки
  labelPosition?: 'justify-start' | 'justify-end'
}

const Checkbox: FC<CheckboxProps> = ({ label, labelPosition, className,  ...props }) => {
  return (

      <label className={`label cursor-pointer ${labelPosition}`}>
        <input
          type="checkbox"
          className={`checkbox ${className || 'checkbox-primary'}`}
          {...props}
        />
        <span className="label-text ml-2">{label}</span>
      </label>

  );
};

export default Checkbox;
