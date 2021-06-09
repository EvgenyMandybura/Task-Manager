import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ field, form, placeholder }) => {
  const { setFieldTouched, setFieldValue } = form;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    setFieldValue(field.name, editorState);
  };

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        name={field.name}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(field.name, true)}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};
export default RichTextEditor;
