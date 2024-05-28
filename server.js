const http = require ('http');
const app = require ('./app')
const serser = http.createServer(app);
serser.listen(8000,()=>{
    console.log('Server is running at localhost:8000');
});