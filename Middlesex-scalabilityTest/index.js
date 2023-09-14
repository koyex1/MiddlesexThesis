var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var apiConfig = express();
var cors = require('cors');
var os = require('os-utils');

apiConfig.use(cors());
apiConfig.use(bodyParser.json({limit: "50mb"}));
apiConfig.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 5000}));


var store = {};

apiConfig.get('/stress', async(req, res)=>{
    items = {"event":"scalability test"}
     if (items) {
      res.json(items);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
})   

http.Server(apiConfig).listen(3002, ()=>{
    console.log("server running on 3002")
})




process.on('SIGINT', ()=> {
  console.log('process terminated')
  process.exit(0)
})


process.on('SIGTERM', ()=> {
  console.log('process terminated')
  process.exit(0)
})


setInterval(() => {

os.cpuUsage(function(v){
    console.log( 'CPU Usage (%): ' + (v*100) );
});

}, 1000)
