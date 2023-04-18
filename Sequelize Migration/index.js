//Importing the required modules
let express=require('express');
let app=express();
const joi=require('joi');
let Sequelize=require('sequelize');
//Establishment of connection to the student database
const sequelize=new Sequelize('student','root','admin',{
    host:'127.0.0.1',
    dialect:'postgres',
    define: {
      freezeTableName: true // use singular table names
    }
});
app.use(express.json());
//Model for student table
const student=sequelize.define('student',{
    rollno: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
});
//API to send student record to the client
app.get('/student/:rollno',async (req,res)=>{
    const schema=joi.object({
        rollno:joi.number().min(1).required()
    })
    let {error}=schema.validate(req.params);
    if(error){
        return res.status(400).send('invalid rollno');
    }
    let details=await sequelize.query(`SELECT * FROM student WHERE rollno=${req.params.rollno};`);
    if(details[0][0].length==0){
      return res.status(404).send('rollno not found');
    }
    return res.status(200).send(details[0][0]);
});
//API to update student records
app.put('/student/:rollno',async(req,res)=>{
  let schema=joi.object({
    name:joi.string().min(3).max(30),
    email:joi.string().email(),
    phone:joi.string().pattern(new RegExp('^\\d{10}$')).min(10).max(10)
  });
  let {error}=schema.validate(req.body);
  if(error){
    return res.send(error);
  }
  student.update(
    req.body,
    { where: { rollno: req.params.rollno } }
  ).then(() => {
    res.status(200).send('Updation success');
  }).catch((err) => {
    res.send(err);
  });
});
//API to add record to the table
app.post('/student',async(req,res)=>{
  let schema=joi.object({
    name:joi.string().min(3).max(30).required(),
    email:joi.string().email(),
    phone:joi.string().pattern(new RegExp('^\\d{10}$')).min(10).max(10)
  });
  let {error}=schema.validate(req.body);
  if(error){
    return res.status(400).send(error);
  }
  student.create(req.body)
  .then(()=>{return res.status(200).send('Insertion successful')})
  .catch((error)=>{
    res.send(error);
  });
  
});
//API to delete student record with rollno
app.delete('/student/:rollno',async (req,res)=>{
  const schema=joi.object({
    rollno:joi.number().min(1).required()
  })
  let {error}=schema.validate(req.params);
  if(error){
    return res.status(400).send('invalid rollno');
  }
  await sequelize.query(`DELETE FROM student WHERE rollno=${req.params.rollno}`);
  res.status(200).send('details of rollno deleted');
});
//Launching the server
app.listen(9000,()=>console.log('server started successfully'));



