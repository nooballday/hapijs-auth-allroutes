var model_user = require('./model/index');

//validate function by comparing username inside payload and model username
module.exports = (decoded, request, callback) => {
    console.log(request.params.username);
    //version 1.0.2
    if(request.params.username == decoded.username){
        return callback(null, true);
    } else {
        return callback(null, false);
    }
}