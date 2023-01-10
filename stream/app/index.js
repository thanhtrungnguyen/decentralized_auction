import firebase from "firebase-admin";
import credentials from "./key.json" assert { type: "json" };

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});

async function getContractInteraction() {
  const database = firebase.firestore();
  const col = await database.collection("/moralis/events/Auction").get();
  let list = [];
  col.forEach((doc) => {
    list.push(doc.data());
  });
  console.log(list);
}

getContractInteraction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
