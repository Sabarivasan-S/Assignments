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
                function send(response){
                    this.response=response
                }
            },
          body:{
            rollno:0
          }
        };
         createStudent(req,res);
        createdrollno=res.body.rollno;
        console.log(res)
        expect(res.returnedstatus).to.equal(200);
        done();
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
                console.log('entered status')
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
            ,
          body:{
            rollno:0
          }
        };
         createStudent(req,res);
        console.log(res)
        expect(res.response).to.equal('validation error');
        done();
    })
})
describe('update student',()=>{
    it('update user with valid details',(done)=>{
        let req={
            body:{
                name:'updatedname',
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        };
         updateStudent(req,res);
        console.log(res)
        expect(res.returnedstatus).to.equal(200);
    })
    it('update user with valid details',(done)=>{
        let req={
            body:{
                name:'no',
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        };
         updateStudent(req,res);
        console.log(res)
        expect(res.returnedstatus).to.equal(400);
    })
})
describe('get student',()=>{
    it('test with valid rollno',(done)=>{
        let req={
            params:{
                rollno:1
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        }
         getStudent(req,res);
        console.log(res)
        expect(res.returnedstatus).to.equal(200);
        done();
    })
    it('test with invalid rollno',(done)=>{
        let req={
            params:{
                rollno:'notanumber'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        }
         getStudent(req,res);
        console.log(res);
        expect(res.returnedstatus).to.equal(400);
        done()
    })
})
describe('delete student',()=>{
    it('testing with valid student rollno',(done)=>{
        let req={
            params:{
                rollno:1
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        }
        deleteStudent(req,res);
        console.log(res);
        expect(res.returnedstatus).to.equal(200);
        done();
    })
    it('testing with invalid student rollno',(done)=>{
        let req={
            params:{
                rollno:'notanumber'
            }
        }
        let res={
            status:function(s){
                this.returnedstatus=s;
                function send(response){
                    this.response=response
                }
            }
        }
        deleteStudent(req,res);
        console.log(res)
        expect(res.returnedstatus).to.equal(400);
        done();
    })
})