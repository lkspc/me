import React, { FC } from "react";
import Button from "../../components/Button";
import { ICtrolType } from "../../types";
import "./index.less";

export type ToolbarProps = {
  controls?: ICtrolType[];
};

const renderControl = ({ type = "button", name, title }: ICtrolType) => {
  switch (type) {
    case "button":
      return <Button key={name} name={name} title={title} />;
    case "dropdown":
      return null;
    default:
      return null;
  }
};

const Toolbar: FC<ToolbarProps> = ({ controls = [] }) => {
  return (
    <div className="react-editor-toolbar">{controls.map(renderControl)}</div>
  );
};

export default Toolbar;
