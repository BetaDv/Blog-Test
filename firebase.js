module.exports = () => {
  const {
    initializeApp,
    applicationDefault,
    cert,
  } = require("firebase-admin/app");
  const {
    getFirestore,
    Timestamp,
    FieldValue,
  } = require("firebase-admin/firestore");
  const log = require("./tools/console");

  const serviceAccount = require("./config/firestoreKey.json");

  initializeApp({
    credential: cert(serviceAccount),
  });

  log.success("Successfuly connected to the Database.");

  return (db = getFirestore());
};
