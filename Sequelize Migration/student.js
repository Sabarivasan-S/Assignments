//Importing the required modules
let express=require('express');
let app=express();
const joi=require('joi');
const {student}=require('./models')
app.use(express.json());
//API to send student record to the client
app.get('/student/:rollno',async (req,res)=>{
    await getStudent(req,res);
});
//API to update student records
app.put('/student/:rollno',async(req,res)=>{
  await updateStudent(req.res);
});
//API to add record to the table
app.post('/student',async(req,res)=>{
  await createStudent(req,res);
  
});
//API to delete student record with rollno
app.delete('/student/:rollno',async (req,res)=>{
  await deleteStudent(req,res);
});



async function deleteStudent(req,res){
  const schema=joi.object({
    rollno:joi.number().min(1).required()
  })
  let {error}=schema.validate(req.params);
  if(error){
    return res.status(400).send('invalid rollno');
  }
  await student.destroy({where:{rollno:req.params.rollno}})
  return res.status(200).send('details of rollno deleted');
}
async function createStudent(req,res){
  
  let schema=joi.object({
    name:joi.string().min(3).max(30).required(),
    email:joi.string().email(),
    phone:joi.string().pattern(new RegExp('^\\d{10}$')).min(10).max(10)
  });
  let {error}=schema.validate(req.body);
  if(error){
    return res.status(400).send('validation error');
  }
    let createdStudent=await student.create(req.body);
    res.body.rollno=createdStudent.rollno;
    return res.status(200).send('insertion successful')

  
}


async function updateStudent(req,res){
  let schema=joi.object({
    name:joi.string().min(3).max(30),
    email:joi.string().email(),
    phone:joi.string().pattern(new RegExp('^\\d{10}$')).min(10).max(10)
  });
  let {error}=schema.validate(req.body);
  if(error){
    return res.status(400).send('error');
  }
  let details=await student.update(
    req.body,
    { where: { rollno: req.params.rollno } }
  )
  return res.status(200).send('Updation success');
  
}


async function getStudent(req,res){
  const schema=joi.object({
    rollno:joi.number().min(1).required()
})
let {error}=schema.validate(req.params);
if(error){
    return res.status(400).send('invalid rollno');
}
let details=await student.findAll({where:{rollno:req.params.rollno}})
return res.status(200).send(details[0][0]);
}
app.listen(3000,()=>console.log('server started'));
module.exports={createStudent,updateStudent,deleteStudent,getStudent};