import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './style.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary' | 'secondary';
  actionType?: 'submit' | 'reset' | 'button';
  label?: string;
  size?: 'small' | 'medium' | 'large' | 'fullWidth';
  onClick?: () => void;
}

export const Button = ({
  buttonType,
  actionType,
  label,
  size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={actionType}
      className={classnames(
        styles.button,
        styles[`button--${buttonType}`],
        styles[`button--${size}`],
        styles[`button--${buttonType}--${size}`]
      )}
      {...props}
    >
      <span className={`${styles.label} text text_size_l text_type_normal`}>
        {label}
      </span>
    </button>
  );
};
