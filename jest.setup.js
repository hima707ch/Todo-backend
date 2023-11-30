const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  global.__MONGO_URI__ = "mongodb://localhost:27017/Todo";
};
