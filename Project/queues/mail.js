const Queue=require('bull');
const joi=require('joi');
const Sequelize=require('sequelize');
const milliseconds=require('milliseconds');
const sequelize=new Sequelize('ecommerce','root','admin',{
    host:'127.0.0.1',
    dialect:'postgres'
});
const users=sequelize.define('users',{
    userid: {
        allowNull: false,
        autoIncrement: true,console.log('updated');
    console.log('--------------------------------------')
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      valid:{
        allowNull:true,
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }
);
const primaryQueue = new Queue('Common emails',{redis:{host:'127.0.0.1',port:6379}});
const secondaryQueue = new Queue('uncommon emails');
const valid={valid:'valid'};
const invalid={valid:'invalid'};
const schema=joi.string().email().custom((value,helpers)=>{
    if(value.endsWith('@gmail.com')|| value.ensWith('@yahoo.com')){
        return null;
    }
    else{
        return helpers.message('added to queue');
    }
})

primaryQueue.process(async(job,done)=>{
    console.log('entered');
    let userDetails=job.data;
    let userEmail=userDetails.email;
    let result=schema.validate(userEmail)
    if(result.error){
        await users.update({valid:'pending'},{where:{userid:userDetails.userid}});
        console.log('moved to secondary queue');
        done();
    }
    else{
        await users.update(valid,{where:{userid:userDetails.userid}});
        console.log('updated')
        done();
    }
})
secondaryQueue.add({},{
    repeat:{
        cron:'*/30 * * * *'
    }
})
secondaryQueue.process(async(job,done)=>{
    await users.update(invalid,{where:{valid:'pending'}});
    done();
});


module.exports={primaryQueue};
