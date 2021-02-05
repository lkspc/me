import { IControl } from '../../components/Control';
import './index.less';

export const Heading: IControl = {
  name: 'controls.heading',
  className: 'react-editor-control-heading',
  tooltip: 'controls.heading',
  type: 'dropdown',
  options: {
    'Heading 1': 'h1',
    'Heading 2': 'h2',
    'Heading 3': 'h3',
    'Heading 4': 'h4',
    'Heading 5': 'h5',
  },
};

export default Heading;
