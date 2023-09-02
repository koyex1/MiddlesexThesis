var items = []


var getFromStore = (itemId)=>{
  const item = items.find(item => item.id === itemId);
    return item
}

var getAllFromStore = ()=>{
    return items
}

var addToStore = (newItem)=>{

    newItem.id = items.length + 1;
    items.push(newItem);
    return newItem
}


var deleteFromStore = (itemId)=>{
    const index = items.findIndex(item => item.id === itemId);

    if (index !== -1) {
      items.splice(index, 1);
      return true;
    } else {
      return false;
    }
}

var updateStore = (itemId, updatedItem) =>{
    const index = items.findIndex(item => item.id === itemId);
    if(index  !== -1){
        items[index] = { ...items[index], ...updatedItem };
        return items[index]
    }
    else{
        return {}
    }

}

var deleteAllFromStore = () =>{
    items = []
}

storageModel = {getFromStore, getAllFromStore, addToStore, updateStore, deleteFromStore, deleteAllFromStore}

module.exports = storageModel;