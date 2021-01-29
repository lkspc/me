import React, { FC, useState } from "react";
import {
  Editor,
  EditorState,
  DraftEditorCommand,
  RichUtils,
  Modifier,
  DraftHandleValue
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./index.less";
import Toolbar from "../Toolbar";
import Bold from "../../controls/Bold";

export type ReactEditorProps = {
  type: "my";
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
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div className="react-editor">
      <Toolbar controls={[Bold]} />
      <div className="react-editor-content" style={{ height: 300 }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default ReactEditor;
