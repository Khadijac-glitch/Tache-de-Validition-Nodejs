const http = require ('http');
const GetPassword = require ('./GetPassword')
const server = http.createServer(GetPassword);
server.listen(8000,()=>{
    console.log('Server is running at localhost:8000');
});
