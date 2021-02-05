import React, { FC, useState } from 'react';
import {
  Editor,
  EditorState,
  DraftEditorCommand,
  RichUtils,
  Modifier,
  DraftHandleValue,
} from 'draft-js';
import Toolbar from './components/Toolbar';
import { Bold, Heading } from './controls';
import 'draft-js/dist/Draft.css';
import './index.less';

export type ReactEditorProps = {
  type: 'type1' | 'type2';
};

const ReactEditor: FC<ReactEditorProps> = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <div className="react-editor">
      <Toolbar
        state={editorState}
        controls={[Bold, Heading]}
        onChange={handleChange}
      />
      <div className="react-editor-content" style={{ height: 300 }}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default ReactEditor;
