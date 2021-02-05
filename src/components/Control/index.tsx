import React, { FC, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { EditorState } from 'draft-js';
import Button from '../Button';
import Dropdown, { DropdownProps } from '../Dropdown';
import './index.less';

export type ControlEditor = {
  state: EditorState;
  update: (state: EditorState) => void;
};

interface BaseControl {
  name: string;
  className?: string;
  tooltip?: string;
  disabled?: (editor: ControlEditor) => boolean;
  command?: string;
  onCommand?: (editor: ControlEditor, params?: any) => void;
}

export type ControlType = 'button' | 'dropdown' | 'custom';

export type ControlRender<T> = (
  dom: ReactNode,
  props: Omit<T, 'render'>,
  editor: ControlEditor
) => ReactNode;

export interface ButtonControl extends BaseControl {
  type: 'button';
  active?: (editor: ControlEditor) => boolean;
  render?: ControlRender<ButtonControl>;
  onCommand?: (editor: ControlEditor, params?: { active?: boolean }) => void;
}

export interface DropdownControl extends BaseControl {
  type: 'dropdown';
  selected?: (editor: ControlEditor) => string;
  options?: DropdownProps['options'];
  render?: ControlRender<DropdownControl>;
  onCommand?: (
    editor: ControlEditor,
    params: { label: string; value: any }
  ) => void;
}

export interface CustomControl extends BaseControl {
  type: 'custom';
  render?: ControlRender<CustomControl>;
  onCommand?: (editor: ControlEditor, params: any) => void;
  [key: string]: any;
}

export type IControl = ButtonControl | DropdownControl | CustomControl;

export type ControlProps = IControl & {
  editor: ControlEditor;
};

const Control: FC<ControlProps> = ({ editor, type, render, ...rest }) => {
  let control = null;

  if (type === 'button') {
    const { className, active, disabled, onCommand, ...props } = rest as Omit<
      ButtonControl,
      'type' | 'render'
    >;
    control = (
      <Button
        className={classNames('react-editor-control', className)}
        active={active?.(editor)}
        disabled={disabled?.(editor)}
        onClick={(active) => onCommand?.(editor, { active })}
        {...props}
      />
    );
  }

  if (type === 'dropdown') {
    const { className, selected, disabled, onCommand, ...props } = rest as Omit<
      DropdownControl,
      'type' | 'render'
    >;
    control = (
      <Dropdown
        className={classNames('react-editor-control', className)}
        selected={selected?.(editor)}
        onChange={(label, value) => onCommand?.(editor, { label, value })}
        {...props}
      />
    );
  }

  return render
    ? (render(control, { type, ...rest } as any, editor) as null)
    : control;
};

export default Control;
