import mongoose from "mongoose";

const dbExecute = (db, fn) => db.then(fn).finally(() => mongoose.disconnect());

export function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, {}), fn);
}
