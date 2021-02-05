import React, { FC } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Control, { ControlEditor, IControl } from '../Control';
import './index.less';

export type ToolbarProps = {
  className?: string;
  state: EditorState;
  controls?: IControl[];
  onChange?: (state: EditorState) => void;
};

const Toolbar: FC<ToolbarProps> = ({
  className,
  state,
  controls = [],
  onChange,
}) => {
  const editor: ControlEditor = {
    state,
    update: (state) => onChange?.(state),
  };

  return (
    <div className={classNames('react-editor-toolbar', className)}>
      {controls.map((props) => (
        <Control key={props.name} editor={editor} {...props} />
      ))}
    </div>
  );
};

export default Toolbar;
