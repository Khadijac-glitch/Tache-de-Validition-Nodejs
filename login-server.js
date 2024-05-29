const http = require ('http');
const app = require ('./login')
const serser = http.createServer(app);
serser.listen(6000,()=>{
    console.log('Server is running at localhost:6000');
});