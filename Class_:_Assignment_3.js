// Import the required modules and creating interface and object for them
let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var events = require('events');
var eventEmitter = new events.EventEmitter();
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
let students = {};

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
    return;
}

// Define a function to ask the user for input
function ask() {
    console.log('Choose an option:\n1. Create [must if no student created]\n2. Set mark\n3. Get marks\n4. Fetch details');
    rl.question('', (option) => {
        rl.question('Student id:', (id) => {
            // If the chosen option is '2', ask for the subject and mark
            if (option == '2') {
                rl.question('Subject:', (subject) => {
                    rl.question('Mark:', (mark) => {
                        perform(option, id, subject, mark);
                    });
                });
            } else {
                perform(option, id, null, null);
            }
        });
    });
}

// Define a function to ask the user if they want to continue
function listen() {
    rl.question('Do you want to continue? (y/n) ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            ask();
        } else {
            rl.close();
            return;
        }
    });
}
rl.on('error',()=>{
    console.log('An error Occured');
    return;
})

// Start the program by calling the ask() function
ask();
