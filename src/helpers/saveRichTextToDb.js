import { convertToRaw } from "draft-js";
export const saveToDb = (editorState) => {
  const contentState = editorState.getCurrentContent();
  return JSON.stringify(convertToRaw(contentState));
};
