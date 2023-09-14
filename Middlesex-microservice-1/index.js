var http = require('http');
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser')
var apiConfig = express();
var cors = require('cors');


apiConfig.use(cors());
apiConfig.use(bodyParser.json({limit: "50mb"}));
apiConfig.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 5000}));

//For EKS: micro2service.default.svc.cluster.local
//For dockercompose: mymicro2
//For localhost
var hostname = '172.31.7.69'
var hostport = '3002'

ApiFunction = async() =>{

apiConfig.get('/getAll', async(req, res)=>{
   // const {z} = req.body;
//`http://${hostname}:${hostport}/getAll`
 let data1 = await axios.get(`http://${hostname}:${hostport}/getAll`)
   res.json(data1.data)
})
 
apiConfig.get('/get/:id', async(req, res)=>{
   // const {z} = req.body;
   const itemId = parseInt(req.params.id);
   let data1 = await axios.get(`http://${hostname}:${hostport}/get/`+itemId) 
   res.json(data1.data)
})

apiConfig.post('/post', async(req, res)=>{
   // const {z} = req.body;
   let data1 = await axios.post(`http://${hostname}:${hostport}/post`,req.body)
   res.json(data1.data)

})


apiConfig.put('/update/:id', async(req, res)=>{
   // const {z} = req.body;
   const itemId = parseInt(req.params.id);
   const updatedItem = req.body;
   let data1 = await axios.put(`http://${hostname}:${hostport}/update/`+itemId,updatedItem)
   res.json(data1.data)
})


apiConfig.delete('/delete/:id', async(req, res)=>{
    //const {z} = req.body;
    const itemId = parseInt(req.params.id);
    let data1 = await axios.delete(`http://${hostname}:${hostport}/delete/`+itemId)
    res.json(data1.data)
})

}

ApiFunction();

http.Server(apiConfig).listen(3001, ()=>{
    console.log("server running on 3001")
})

