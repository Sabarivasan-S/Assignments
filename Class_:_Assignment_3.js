// Import the required modules and creating interface and object for them
const readline = require('readline-promise').default;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.on('close', listen);
// Define a Student class
class Student {
    constructor(id) {
        this.id = id;
        this.marks = {};
    }
    
    setMarks(subject, mark) {
        this.marks[subject] = mark;
    }
    
    getMarks() {
        return this.marks;
    }
    
    fetchDetails() {
        return this;
    }
    
    static Create(id) {
        return new Student(id);
    }
}
// Create an empty object to store the students
const students = {};
// Define a function to perform the chosen action
function perform(option, id, subject, mark) {
    switch(option) {
        case '1':
            let student = Student.Create(id);
            students[id] = student;
            console.log(student);
            break;
            
        case '2':
            if (!students[id]) {
                console.log('Student id does not exist.');
                break;
            }
            students[id].setMarks(subject, mark);
            break;
            
        case '3':
            if (!students[id]) {
                console.log('Student id does not exist.');
                break;
            }
            console.log(students[id].getMarks());
            break;
            
        case '4':
            if (students[id]) {
                console.log(`Details of student ${id}:`, students[id].fetchDetails());
            } else {
                console.log('Invalid id');
            }
            break;
            
        default:
            console.log('Invalid option');
            break;
    }
    
    // Emit the 'close' event
    eventEmitter.emit('close');
}
// Define a function to ask the user for input
async function ask() {
    console.log('Choose an option:\n1. Create [must if no student created]\n2. Set mark\n3. Get marks\n4. Fetch details');
    const option = await rl.questionAsync('');
    const id = await rl.questionAsync('Student id:');
    // If the chosen option is '2', ask for the subject and mark
    if (option == '2') {
        const subject = await rl.questionAsync('Subject:');
        const mark = await rl.questionAsync('Mark:');
        await perform(option, id, subject, mark);
    } else {
        await perform(option, id, null, null);
    }
}
// Define a function to ask the user if they want to continue
async function listen() {
    const answer = await rl.questionAsync('Do you want to continue? (y/n) ');
    if (answer.toLowerCase() === 'y') {
        await ask();
    } else {
        rl.close();
    }
}
// Handle errors
rl.on('error', (err) => {
    console.log('An error occurred:', err);
});
// Start the program by calling the ask() function
ask();
