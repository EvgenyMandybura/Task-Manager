import { firestore } from "../Firebase/firebase";

const uploadToFirebase = async (
  dataForStorage,
  storage,
  Id,
  file,
  collectionUrl
) => {
  const { ...rest } = dataForStorage;
  await storage?.put(file, { contentType: "image/jpeg" });
  const fileUrl = await storage?.getDownloadURL();
  await firestore
    .collection(collectionUrl)
    .doc(Id)
    .set({
      ...rest,
      fileUrl,
    });
}

export default uploadToFirebase;
