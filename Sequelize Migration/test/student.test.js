let {expect}=require('chai');
let {createStudent,updateStudent,deleteStudent,getStudent}=require('../student');
let sinon=require('sinon');
const {student}=require('../models')
let createdrollno=0;

describe('createStudent',()=>{
    it('test with valid details',async ()=>{
        let req={
            body:{
                name:'testname',
                email:'testemail@mail.com',
                phone:'5756507879'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                createdrollno=this.body.rollno;
                expect(this.returnedstatus).to.equal(200);
            },
            body:{
                rollno:0
            }
        };
        await createStudent(req,res);
        let createdStudentDetails=await student.findOne({where:{rollno:createdrollno}});
        expect(createdStudentDetails).to.not.equal(null);
        
        
    })
    it('test with invalid details',(done)=>{
        let req={
            body:{
                name:'testname',
                email:'testemail@mailcom',
                phone:'575507879'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                expect(this.response).to.equal('validation error');
                done();
            },
            body:{
                rollno:0
            }
        };
        createStudent(req,res);
    })
})
describe('update student',()=>{
    beforeEach(async()=>{
        detailscreated = await student.create({
            name:'testname',
            email:'testemail@mailcom',
            phone:'575507879'
        })
        createdrollno=detailscreated.rollno;
    })
    afterEach(()=>{
        student.destroy({where:{rollno:createdrollno}});
    })
    it('update user with valid details',async()=>{
        let req={
            params:{
                rollno:createdrollno
            },
            body:{
                name:'updatedname',
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                expect(this.returnedstatus).to.equal(200);
                
            }
        };
        await updateStudent(req,res);
        let updatedDetails=await student.findOne({attributes:['name'],where:{
            rollno:createdrollno
        }})
        expect(updatedDetails.name).to.equal('updatedname');
    })
    it('update user with invalid details',(done)=>{
        let req={
            params:{
                rollno:'not a number'
            },
            body:{
                name:65,
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                expect(this.returnedstatus).to.equal(400);
                console.log(res);
                done();
            }
        };
        updateStudent(req,res);
    })
})
describe('get student',()=>{
        beforeEach(async()=>{
            detailscreated = await student.create({
                name:'testname',
                email:'testemail@mailcom',
                phone:'575507879'
            })
            createdrollno=detailscreated.rollno;
        })
    afterEach(()=>{
        student.destroy({where:{rollno:createdrollno}});
    })
    it('get student with valid details',async ()=>{
        let receivedDetails;
        let req={
            params:{
                rollno:createdrollno
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                receivedDetails=response;
                expect(this.returnedstatus).to.equal(200);
            }
        };
        await getStudent(req,res);
        expect(receivedDetails).to.not.equal(null);
    })
    it('get student with invalid details',(done)=>{
        let req={
            params:{
                rollno:'not a number'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                expect(this.returnedstatus).to.equal(400);
                console.log(res);
                done();
            }
        };
        getStudent(req,res);
    })
})
describe('delete student',()=>{
    beforeEach(async()=>{
        detailscreated = await student.create({
            name:'testname',
            email:'testemail@mailcom',
            phone:'575507879'
        })
        createdrollno=detailscreated.rollno;
    })
    afterEach(()=>{
        student.destroy({where:{rollno:createdrollno}});
    })
    it('delete student with valid details',async ()=>{
        let req={
            params:{
                rollno:createdrollno
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                this.response=response;
                expect(this.returnedstatus).to.equal(200);
            }
        };
        await deleteStudent(req,res);
        let deletedDeatils=await student.findOne({where:{rollno:createdrollno}});
        expect(deletedDeatils).to.be.equal(null);
    })
    
    it('delete student with invalid details',(done)=>{
        let req={
            params:{
                rollno:'not a number'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                return this;
            },
            send:function(response){
                expect(this.returnedstatus).to.equal(400);
                console.log(res);
                done();
            }
        };
        deleteStudent(req,res);
    })
})
