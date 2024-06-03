const http = require ('http');
const app = require ('../register');
// const email= require ('../register');
const { register } = require('module');
const app = http.createServer(register);
app.listen(8000,()=>{
    console.log('Server is running at localhost:...');
});
// const email = http.createServer(register);
// email.listen(8000,()=>{
//     console.log('Server is running at localhost:..');
// });