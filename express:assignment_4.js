// Importing the required modules
const express = require('express');
const Joi = require('joi');

// Creating an instance of the express app
const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Data for students
const students = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Smith' }
];

// Route to handle the home page
app.get('/', (req, res) => {
  res.send('Welcome to the Student API!');
});

// Route to get all the students
app.get('/api/students', (req, res) => {
  res.send(students);
});

// Route to get a specific student by ID
app.get('/api/students/:id', (req, res) => {
  const student = findStudentById(req.params.id);
  if (!student) {
    res.status(404).send(`The student with ID ${req.params.id} was not found.`);
  } else {
    res.send(student);
  }
});

// Route to add a new student
app.post('/api/students', (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validateStudent(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Create a new student object and add it to the students array
  const student = {
    id: students.length + 1,
    name: req.body.name
  };
  students.push(student);
  res.send(student);
});

// Route to update a student by ID
app.put('/api/students/:id', (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validateStudent(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Find the student by ID and update its name
  let student = findStudentById(req.params.id);
  if (!student) {
    res.status(404).send(`The student with ID ${req.params.id} was not found.`);
    return;
  }
  student.name = req.body.name;
  res.send(student);
});

// Route to delete a student by ID
app.delete('/api/students/:id', (req, res) => {
  // Find the student by ID and remove it from the students array
  const student = findStudentById(req.params.id);
  if (!student) {
    res.status(404).send(`The student with ID ${req.params.id} was not found.`);
    return;
  }
  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send('The student was deleted successfully.');
});

// Joi schema to validate the request body for adding/updating a student
function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(student);
}

// Helper function to find a student by ID in the students array
function findStudentById(id) {
  return students.find(student => student.id === parseInt(id));
}

// Starting the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
