import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { t } from '../../locales';
import './index.less';

export type DropdownProps<T = any> = {
  name: string;
  className?: string;
  tooltip?: string;
  selected?: string;
  disabled?: boolean;
  options?: { [label: string]: T } | { label: string; value: T }[];
  onChange?: (label: string, value: T) => void;
};

const mapOptions = (
  options: DropdownProps['options'],
  mapping: (label: string, value: any) => ReactNode
) => {
  if (!options) {
    return [];
  }

  if (Array.isArray(options)) {
    return options.map(({ label, value }) => mapping(label, value));
  }

  return Object.entries(options).map(([label, value]) => mapping(label, value));
};

const Dropdown: FC<DropdownProps> = ({
  className,
  name,
  tooltip = name,
  selected,
  options = [],
  onChange,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const handleChange = (label: string, value: any) => {
    onChange?.(label, value);
    setVisible(false);
  };

  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setVisible(!visible);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        ref.current !== event.target &&
        ref.current?.getAttribute('data-visible') === 'true'
      ) {
        setVisible(false);
      }
    };

    window.addEventListener('mousedown', handler);

    return () => {
      window.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <span
      className={classNames('react-editor-dropdown', className)}
      title={t(tooltip)}
      ref={ref}
      onMouseDown={handleToggle}
      data-visible={visible}
    >
      <span className="react-editor-dropdown-selected">{t(selected)}</span>
      <span className="react-editor-dropdown-selector">
        <div
          className={classNames(
            'react-editor-dropdown-options',
            visible && 'react-editor-dropdown-options--visible'
          )}
        >
          {mapOptions(options, (label, value) => (
            <div
              key={label}
              className={classNames(
                'react-editor-dropdown-option',
                selected === label && 'react-editor-dropdown-option--selected'
              )}
              onClick={() => handleChange(label, value)}
              title={t(label)}
            >
              {t(label)}
            </div>
          ))}
        </div>
      </span>
    </span>
  );
};

export default Dropdown;
