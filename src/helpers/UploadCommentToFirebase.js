import { firestore } from "../components/Firebase/firebase";

async function uploadCommentsToFirebase(dataForStorage, Id, collectionUrl) {
  console.log("dataForStorage", dataForStorage);
  console.log("Id", Id);
  console.log("collectionUrl", collectionUrl);
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
