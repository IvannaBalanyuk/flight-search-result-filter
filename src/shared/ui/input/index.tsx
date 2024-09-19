/* eslint-disable react/display-name */
import { InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
  placeholder?: string;
}

export const Input = ({
  type,
  placeholder,
  name,
  onChange,
  label,
  id,
  ...props
}: InputProps) => {
  return (
    <div className={styles.input_container}>
      {label && (
        <label className={`text text_type_normal text_size_s`} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        {...props}
      />
    </div>
  );
};
