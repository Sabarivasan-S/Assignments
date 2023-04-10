const express=require('express')
const app=express()
const Joi=require('joi')
app.use(express.json())
const stud=[
{id:1,name:'name1'},
{id:2,name:'name2'},
{id:3,name:'name3'}
]
app.get('/',(req,res)=>{
    res.send('welcome to home!!!')
})
app.get('/api/students',(req,res)=>{
    res.send(stud)
})
app.get('/api/students/:id',(req,res)=>{
    const s=chk(req.params.id)
    if(!s) res.status(404).send(`no studendts exits with id ${req.params.id}`)
    else res.send(s)
})
app.post('/api/students/',(req,res)=>{
    const {error}=val(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const stu={
        id:stud.length+1,
        name:req.body.name
    }
    res.send(stu)
    stud.push(stu)
    
}) 
app.put('/api/students/:id',(req,res)=>{
    const {error}=val(req.body)
    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const s=chk(req.params.id)
    if(!s){
        res.status(404).send('id not found')
        return
    }
    s.name=req.body.name
    res.send(s)
})
app.delete('/api/students/:id',(req,res)=>{
    var r=chk(req.params.id)
    if(!r){
        res.status(404).send(`the with id ${req,params.id} not found`)
        return
    }
    var index=stud.indexOf(r)
    stud.splice(index,1)
    res.send('delete success')
})
var val=function(stu){
    const schema=Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(stu)
}
var chk=function(stu){
    return stud.find(c=> c.id===parseInt(stu))
}
const port=3000
app.listen(port,()=>{
    console.log(`BOOM server active on port ${port}`)
})