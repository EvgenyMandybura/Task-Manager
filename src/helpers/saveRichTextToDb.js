import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const saveToDb = (editorState) => {
  return draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(
    /(\r\n|\n|\r)/gm,
    ""
  );
};
