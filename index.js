const express = require('express');
const bodyParser= require('body-parser');

const app = express();
const security = require ('./services/security');
const employeeService=require('./services/employeeService');

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.get('/',(req,res) =>{
  res.send('Started')
});

app.listen(
    port,function(){
        console.log('Server is up and running')
    }
);

app.post('/login',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    const employee=rq.body;
    console.log(employee);
    const jwtToken = security._generateToken(employee);
    console.log(jwtToken);
    rs.status(200).json({
        msg:"Employee Identified",
        token:jwtToken
    })

})

//fetch all employees from mongo
app.get('/employees/id/:id',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    const id=rq.params.id
    // fetch all employees from mongo via mongoose
    employeeService.byId(id,(err,rows)=>{
        if(err) {rs.end('Error Occured')}
        else{
            rs.end(JSON.stringify(rows))
        }
    })    
});

//fetch all employees from mongo by emp id
app.get('/employees',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    // fetch all employees from mongo via mongoose by emp id
    employeeService.all((err,rows)=>{
        if(err) {rs.end('Error Occured')}
        else{
            rs.end(JSON.stringify(rows))
        }
    })    
});

//Add newemployees to mongo db
app.post('/employees/add',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    // add  employees to mongo db
    const employee=rq.body;
    console.log(employee);
    employeeService.add(employee,(err,rows)=>{
        if(err) {rs.end(JSON.stringify({
            message:'Error Occured',err}
        ))}
        else{
            rs.end(JSON.stringify({
                message:"Employee added successfully"
            }))
        }
    })    
});

//Update employees in mongo db
app.put('/employees/edit',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    // add  employees to mongo db
    const employee=rq.body;
    console.log(employee);
    employeeService.edit(employee,(err,result)=>{
        if(err) {rs.end(JSON.stringify({
            message:'Error Occured',err}
        ))}
        else{
            rs.end(JSON.stringify({
                message:"Employee details updated successfully"
            }))
        }
    })    
});
