const jwt = require('jsonwebtoken');

const key = 'jwt-secret-key';

const jwtToken = (employee)=>{
    jwt.sign({
        _empid:employee._empid,
        _name:employee._name
    },
    key,{
        expiresIn:'1h'
    })
};

module.exports={
    _generateToken: jwtToken
}