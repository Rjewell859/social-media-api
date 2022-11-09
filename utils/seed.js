const connection = require('../config/connection');
const { Thought, User } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Course.deleteMany({});

  // Drop existing students
  await Student.deleteMany({});

  // Create empty array to hold the students
  const students = [];


  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 * 8 / 3) - 36)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertMany([
    {
    courseName: 'Art',
    inPerson: true,
    students: [...students],
  },
  {
    courseName: 'Advanced C++',
    inPerson: false,
    students: [...students],
  },
  {
    courseName: 'Networking 203',
    inPerson: true,
    students: [...students],
  },
  {
    courseName: 'Buisiness Leadership',
    inPerson: true,
    students: [...students],
  },
  {
    courseName: 'Accounting 101',
    inPerson: false,
    students: [...students],
  },
  {
    courseName: 'Social Media Web Design',
    inPerson: true,
    students: [...students],
  }
]
  );

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
