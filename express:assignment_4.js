// Importing the required modules
const express = require('express');
const Joi = require('joi');

// Creating an instance of the express app
const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

// data for students
const stud = [  { id: 1, name: 'name1' },  { id: 2, name: 'name2' },  { id: 3, name: 'name3' }];

// Route to handle the home page
app.get('/', (req, res) => {
  res.send('Welcome to home!!!');
});

// Route to get all the students
app.get('/api/students', (req, res) => {
  res.send(stud);
});

// Route to get a specific student by ID
app.get('/api/students/:id', (req, res) => {
  const s = check(req.params.id);
  if (!s) res.status(404).send(`No students exist with id ${req.params.id}`);
  else res.send(s);
});

// Route to add a new student
app.post('/api/students/', (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Create a new student object and add it to the dummy data array
  const stu = {
    id: stud.length + 1,
    name: req.body.name
  };
  stud.push(stu);

  // Send the newly created student object as response
  res.send(stu);
});

// Route to update a student by ID
app.put('/api/students/:id', (req, res) => {
  // Validate the request body using Joi schema
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Find the student by ID and update its name
  let condition= check(req.params.id);
  if (!condition) {
    res.status(404).send('Id not found');
    return;
  }
  name= { name: req.body.name };

  // Send the updated student object as response
  res.send(name);
});

// Route to delete a student by ID
app.delete('/api/students/:id', (req, res) => {
  // Find the student by ID and remove it from the dummy data array
  const s = check(req.params.id);
  if (!s) {
    res.status(404).send(`The student with id ${req.params.id} not found`);
    return;
  }
  const index = stud.indexOf(s);
  stud.splice(index, 1);

  // Send success message as response
  res.send('Delete success');
});

// Joi schema to validate the request body for adding/updating a student
function validate(stu) {
  const schema = Joi.object({
    name: Joi.string().min(4).required()
  });
  return schema.validate(stu);
}

// Helper function to find a student by ID in the dummy data array
function check(stu) {
  return stud.find(c => c.id === parseInt(stu));
}

// Starting the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server active on port ${port}`);
});
