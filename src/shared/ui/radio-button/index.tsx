import { InputHTMLAttributes } from 'react';

import styles from './style.module.css';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton = ({
  label,
  id,
  name,
  onChange,
  checked,
  ...props
}: RadioButtonProps) => (
  <div className={styles.radio_button_container}>
    <input
      type="radio"
      id={id}
      onChange={onChange}
      name={name}
      checked={checked}
      className={styles.radio_button}
      {...props}
    />
    <label
      htmlFor={id}
      className={`${styles.label} text text_type_normal text_size_s`}
    >
      {label}
    </label>
  </div>
);

export default RadioButton;
