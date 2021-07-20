import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import editorStyles from "./formikStyles.scss";

const RichTextEditor = ({ field, form, placeholder }) => {
  const { setFieldTouched, setFieldValue } = form;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    setFieldValue(field.name, editorState);
  };

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      const blocksFromHtml = htmlToDraft(field.value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorStateInit = EditorState.createWithContent(contentState);
      setEditorState(editorStateInit);
      setLoaded(true);
    }
  }, [loaded]);

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
      />
    </div>
  );
};
export default RichTextEditor;
