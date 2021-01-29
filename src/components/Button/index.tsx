import React, { FC } from "react";
import classNames from "classnames";
import "./index.less";

export type ButtonProps = {
  name: string;
  title?: string;
  active?: boolean;
};

const Button: FC<ButtonProps> = ({ name, title = name, active }) => {
  return (
    <span
      className={classNames(
        "react-editor-button",
        active && "react-editor-button--active"
      )}
      title={title}
    >
      {title}
    </span>
  );
};

export default Button;
