var http = require('http');
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser')
var apiConfig = express();
var cors = require('cors');
apiConfig.use(cors());
apiConfig.use(bodyParser.json({limit: "50mb"}));
apiConfig.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 5000}));


ApiFunction = async() =>{

apiConfig.get('/getAll', async(req, res)=>{
console.log("iiiiiii")
   // const {z} = req.body;
 let data1 = await axios.get('http://micro2service.default.svc.cluster.local:3002/getAll')
console.log("donekdkjdkjs")
   console.log(data1.data)
   res.json({"message":"this"})
})
 
apiConfig.get('/get/:id', async(req, res)=>{
   // const {z} = req.body;
   const itemId = parseInt(req.params.id);
   let data1 = await axios.get('http://mymicro2:3002/get/'+itemId)
   console.log(data1.data)
   res.json(data1.data)
})

apiConfig.post('/post', async(req, res)=>{
   // const {z} = req.body;
   let data1 = await axios.post('http://mymicro2:3002/post',req.body)
   res.json(data1.data)

})


apiConfig.put('/update/:id', async(req, res)=>{
   // const {z} = req.body;
   const itemId = parseInt(req.params.id);
   const updatedItem = req.body;
   let data1 = await axios.put('http://mymicro2:3002/update/'+itemId,updatedItem)
   res.json(data1.data)
})


apiConfig.delete('/delete/:id', async(req, res)=>{
    //const {z} = req.body;
    const itemId = parseInt(req.params.id);
    let data1 = await axios.delete('http://mymicro2:3002/delete/'+itemId)
    res.json(data1.data)
})

}

ApiFunction();

http.Server(apiConfig).listen(3001,'0.0.0.0', ()=>{
    console.log("server running on 3001")
})
