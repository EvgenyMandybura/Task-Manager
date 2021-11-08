import { firestore } from "../components/Firebase/firebase";
import { tasksUrl } from "../constants/urlForFiresore";
import firebase from "firebase";

async function uploadTaskToFirebase(dataForStorage, Id, files, collectionUrl) {
  const { ...rest } = dataForStorage;
  const fileUrls = [];
  for (const file of files) {
    const storage = await firebase
      .storage()
      .ref()
      .child(`${tasksUrl}/${file.name}`);
    await storage?.put(file);
    const fileUrl = await storage?.getDownloadURL();
    await fileUrls.push(fileUrl);
  }

  await firestore
    .collection(collectionUrl)
    .doc(Id)
    .set({
      ...rest,
      fileUrls,
    });
}

export default uploadTaskToFirebase;
