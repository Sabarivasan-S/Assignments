const express=require('express');
const joi=require('joi');
const Sequelize=require('sequelize');
const jwt=require('jsonwebtoken');
let {authenticateToken}=require('./authenticationserver.js')
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(authenticateToken);
const sequelize=new Sequelize('ecommerce','root','admin',{
    host:'127.0.0.1',
    dialect:'postgres'
});
const orders=sequelize.define('orders',{
    orderid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      product: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
});

//Route to receive all the orders of user
app.get('/orders',async (req,res)=>{
    let orderdetails=await orders.findAll({where:{userid:req.userid}});
    if(orderdetails[0]==null) return res.status(200).send('No order exist for user');
    res.send(orderdetails);
});
//Route to get specific order
app.get('/order/:orderid',async (req,res)=>{
    console.log('entered-----');
    let orderid=req.params.orderid;
    let orderdetail
    try{
        orderdetail=await orders.findAll({where:{userid:req.userid,orderid:orderid}});
    }catch(error) {res.status(404).send(error)}
    console.log(orderdetail);
    res.status(200).send(orderdetail);
    
    
});
//Route to create order
app.post('/order',async (req,res)=>{
    try{
        let schema=joi.object({
            product:joi.string().required(),
            price: joi.number().min(1).required()
        })
        let {error}=schema.validate(req.body);
        if(error){
            console.log(error);
            res.status(400).send('internal error');
        }
        req.body.userid=req.userid;
        let detail=await orders.create(req.body);
        res.send(detail);
    }
    catch(error){
        res.status(400).send('internal error');
    }
});
//Route to update order datails
app.put('/order/:orderid',async (req,res)=>{
    try{
        let orderid=req.params.orderid;
        let userid=req.userid;
        let schema=joi.object({
            product:joi.string(),
            price: joi.number().min(1)
        })
        let {error}=schema.validate(req.body);
        if(error){
            res.status(400).send('internal error');
        }
        let result=await orders.update(req.body,{where:{orderid,userid}});
        res.send('Updation completed');
    }
    catch(error){
        
        res.status(400).send(error);
    }
});
//Route to delete order
app.delete('/order/:orderid',async (req,res)=>{

        let orderid=req.params.orderid;   
        await orders.destroy({where:{userid:req.userid,orderid:orderid}})
        res.status(200).send('Deletion success');
});

app.listen(7000,()=>{console.log('resource server')});
