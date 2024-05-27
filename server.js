const http = require ('http');
const app = require ('./app')
const serser = http.createServer(app);
serser.listen(3000,()=>{
    console.log('Server is running at localhost:3000');
});