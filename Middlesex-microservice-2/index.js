var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
const {getFromStore, getAllFromStore, addToStore, updateStore, deleteFromStore, deleteAllFromStore} = require('./storage.js')
var apiConfig = express();
var cors = require('cors');
apiConfig.use(cors());
apiConfig.use(bodyParser.json({limit: "50mb"}));
apiConfig.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 5000}));


var store = {};

apiConfig.get('/getAll', async(req, res)=>{
    //const {z} = req.body;
    var items = getAllFromStore()
    if (items) {
      res.json(items);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
})

apiConfig.get('/get/:id', async(req, res)=>{
    //const {z} = req.body;
    const itemId = parseInt(req.params.id);

    const item = getFromStore(itemId)

    if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }

})
   

apiConfig.post('/post', async(req, res)=>{
    //const {z} = req.body;
    const newItem = req.body;
    const resp = addToStore(newItem)
    res.status(201).json(resp);
})


apiConfig.put('/update/:id', async(req, res)=>{
    //const {z} = req.body;
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    var found = updateStore(itemId, updatedItem)

  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }


})


apiConfig.delete('/delete/:id', async(req, res)=>{
    //const {z} = req.body;
    const itemId = parseInt(req.params.id);
    var found = deleteFromStore(itemId)

  if (found) {
    res.json();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }

})

apiConfig.delete('/deleteAll', async(req, res)=>{
  //const {z} = req.body;
  deleteAllFromStore()

  res.json();


})

http.Server(apiConfig).listen(3002, '0.0.0.0', ()=>{
    console.log("server running on 3002")
})
