const connection = require('../config/connection');
const { Thought, User } = require('../models');
const thoughtData = require('./thoughtData.json')
const userData = require('./userData.json')


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  await User.collection.insertMany(userData);

  await Thought.collection.insertMany(thoughtData);

  console.table(userData);
  console.table(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
