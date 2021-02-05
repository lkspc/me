import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { t } from '../../locales';
import './index.less';

export type ButtonProps = {
  name: string;
  className?: string;
  tooltip?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (active?: boolean) => void;
};

const Button: FC<ButtonProps> = ({
  name,
  tooltip = name,
  className,
  active,
  onClick,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick?.(active);
  };

  return (
    <span
      className={classNames(
        'react-editor-button',
        active && 'react-editor-button--active',
        className
      )}
      title={t(tooltip)}
      onMouseDown={handleClick}
    >
      {t(tooltip)}
    </span>
  );
};

export default Button;
