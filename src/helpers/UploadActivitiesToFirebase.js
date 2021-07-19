import { firestore } from "../components/Firebase/firebase";
import { logUrl } from "../constants/urlForFiresore";

async function uploadActivitiesToFirebase(dataForStorage, Id, collectionUrl) {
  const { ...rest } = dataForStorage;
  await firestore
    .collection(collectionUrl)
    .doc(Id)
    .collection(logUrl)
    .doc()
    .set({
      ...rest,
    });
}

export default uploadActivitiesToFirebase;
