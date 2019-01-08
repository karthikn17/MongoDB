const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/employees',{
    useNewUrlParser:true
}).then(
    ()=>{
        console.log("DB connected")
    },err=>{
        console.log("DB Error")
    }
);

const empSchema = mongoose.Schema (
    {
        _empid: Number,
        _name: String,
        _domain: String
    },{collection:'employee'}
);
const employeeModel= mongoose.model('Employee', empSchema);

// let employee=require('../models/Employee')
//fetch all Employees
const findAll = (callback)=>{
    employeeModel.find({},(err,rows)=>{
        callback(err,rows)
    })
}
//fetch all Employees by employee id
const findById = (empId, callback) =>{
    employeeModel.find({_empid :empId},(err,rows)=>{
           callback(err,rows)
        })
}
// add a new Employee document to the collection
const addEmployee = (Employee,callback)=>{
        const EmployeeObj = new employeeModel(
            {_empid:Employee._id,
        _name:Employee.name,
            _domain:Employee.domain})
        employeeModel.create(EmployeeObj,(err,result)=>{
            callback(err,result)
        })
}
//Edit employee details
const editEmployee = (Employee,callback)=>{
        let options ={ multi: true }
        employeeModel.updateOne({_empid:Employee._empid},{_name:Employee._name},
            {_domain:Employee._domain},options,(err,result)=>{
            callback(err,result)
        })
}

module.exports ={
    all : findAll,
    byId : findById,
    add : addEmployee,
    edit : editEmployee
}