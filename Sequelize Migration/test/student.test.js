let {expect}=require('chai');
let {createStudent,updateStudent,deleteStudent,getStudent}=require('../student');
let sinon=require('sinon');
let createdrollno=0;

describe('createStudent',()=>{
    it('test with valid details',(done)=>{
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
                this.body.rollno=createdrollno;
                expect(this.returnedstatus).to.equal(200);
                done();
            },
            body:{
                rollno:0
            }
        };
        createStudent(req,res);
        createdrollno=res.body.rollno;
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
    it('update user with valid details',(done)=>{
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
                done();
            }
        };
        updateStudent(req,res);
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
    it('get student with valid details',(done)=>{
        let req={
            params:{
                rollno:1
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
                done();
            }
        };
        getStudent(req,res);
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
    it('delete student with valid details',(done)=>{
        let req={
            params:{
                rollno:90
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
                done();
            }
        };
        console.log(req.params.rollno)
        deleteStudent(req,res);
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
