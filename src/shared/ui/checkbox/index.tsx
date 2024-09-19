import { InputHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  extraLabel?: string;
}

const Checkbox = ({
  label,
  extraLabel,
  id,
  name,
  checked,
  onChange,
  ...props
}: CheckboxProps) => (
  <div
    className={`${styles.checkbox_container} container text text_type_normal text_size_s`}
  >
    <input
      className={`${styles.checkbox} container`}
      type="checkbox"
      id={id}
      name={name || id}
      onChange={onChange}
      checked={checked}
      value={id}
      {...props}
    />
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    {extraLabel && <span className={styles.extra_label}>{extraLabel}</span>}
  </div>
);

export default Checkbox;
