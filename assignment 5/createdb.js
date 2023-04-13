const Sequelize= require("sequelize");
let seq=new Sequelize('usersandorders','root','admin',{
    host:'127.0.0.1',
    dialect:'postgres'
});
seq.query('CREATE DATABASE student').then(()=>{console.log('db created')});