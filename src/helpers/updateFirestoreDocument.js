import { firestore } from "../components/Firebase/firebase";

async function updateFirestoreDocument(
  dataForStorage,
  storage,
  Id,
  file,
  collectionUrl
) {
  if (!!file) {
    await storage.put(file, { contentType: "image/jpeg" });
    const fileUrl = await storage.getDownloadURL();
    dataForStorage.fileUrl = fileUrl;
  }
  const { ...rest } = dataForStorage;
  await firestore
    .collection(collectionUrl)
    .doc(Id)
    .update({
      ...rest,
    });
}

export default updateFirestoreDocument;
