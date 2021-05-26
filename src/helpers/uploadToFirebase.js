import { firestore } from "../components/Firebase/firebase";

async function uploadToFirebase(
  model,
  storage,
  creatorId,
  boardId,
  collectionUrl
) {
  const { ...rest } = model.values;
  await storage.put(model.fileModel.files[0], { contentType: "image/jpeg" });
  const fileUrl = await storage.getDownloadURL();

  await firestore
    .collection(collectionUrl)
    .doc(boardId)
    .set({
      ...rest,
      fileUrl,
      creatorId,
      boardId,
    });
}

export default uploadToFirebase;
