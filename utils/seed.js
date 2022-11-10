const connection = require('../config/connection');
const { Thought, User } = require('../models');
const thoughtData = require('./thoughtData.json')
const userData = require('./userData.json')


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

 
  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [
    {
      "username": "testpersonname89",
      "email": "emailtest@something.com"
    },
    {
      "username": "batman48",
      "email": "batman@email.com"
    },
    {
      "username": "somethinghere",
      "email": "password12345"
    }
  ]
  
  const thoughts = [
    {
      "thoughtText": "My First Thought.",
      "username": "somethinghere"
    },
    {
      "thoughtText": "It is getting cold and dark now because it is fall.",
      "username": "batman48"
    },
    {
      "thoughtText": "Test Thought",
      "username": "testpersonname89"
    },
    {
      "thoughtText": "What am I supposed to put here?",
      "username": "testpersonname89"
    }
  ]

  await User.collection.insertMany(userData);

  await Thought.collection.insertMany(thoughtData);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
