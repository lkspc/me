import { RichUtils } from 'draft-js';
import { IControl } from '../../components/Control';

export const Bold: IControl = {
  name: 'controls.bold',
  type: 'button',
  tooltip: 'controls.bold',
  active: (editor) => {
    return editor.state.getCurrentInlineStyle().has('BOLD');
  },
  onCommand: (editor) => {
    const state = RichUtils.toggleInlineStyle(editor.state, 'BOLD');
    editor.update(state);
  },
};

export default Bold;
