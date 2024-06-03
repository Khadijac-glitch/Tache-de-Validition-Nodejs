const http = require ('http');
const app = require ('../register');
const { register } = require('module');
const app = http.createServer(register);
app.listen(8000,()=>{
    console.log('Server is running at localhost:...');
});
