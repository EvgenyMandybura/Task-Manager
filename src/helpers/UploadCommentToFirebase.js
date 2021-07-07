import { firestore } from "../Firebase/firebase";

async function uploadCommentsToFirebase(dataForStorage, Id, collectionUrl) {
  await firestore
    .collection(collectionUrl)
    .doc(Id)
    .collection(collectionUrl)
    .doc()
    .set({
      ...dataForStorage,
    });
}

export default uploadCommentsToFirebase;
