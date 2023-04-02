import env from "env-var";

const MONGO_CONNECTION_STRING = env
  .get("MONGO_CONNECTION_STRING")
  .required()
  .asString();

export default MONGO_CONNECTION_STRING;
