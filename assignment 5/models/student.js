let {Model,Datatpyes}=require('sequelize');
const sequelize=require('sequelize');
class student extends Model{};
student.init({
    id:{
        type:Datatpyes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false
});
module.exports=student;