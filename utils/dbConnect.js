const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbConnection;
module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      dbConnection = client.db("mrtirerack");
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  },

  getDb: function () {
    return dbConnection;
  },
};
