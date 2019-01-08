const mongoose=require('mongoose');
const empSchema = mongoose.Schema (
    {
        _empid: Number,
        _name: String,
        _domain: String
    },{collection:'employee'}
);
module.exports = mongoose.model('Employee', empSchema)