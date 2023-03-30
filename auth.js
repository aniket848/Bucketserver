const express = require('express');
const router = express.Router();
const Bucket = require('./model/model');
const History = require('./model/history');

router.get('/',(req,res)=>{
    res.send("ANIKET");
})


router.post('/addhistory', async(req,res)=>{

    const {name,link,date} = req.body;
    const historyobj = new History({
        name,link,date
    });
    await historyobj.save();
    res.send({res:"history successfully saved"});
})

router.get('/getHistory' , async(req,res)=>{
    console.log("reached server");
      const data = await History.find();
      console.log("front server = ",data);
     res.send({data:data});
})

router.post('/addbucket',async (req,res)=>{
    const name = req.body.bucketName;
    console.log(name);
    const newBucket = new Bucket({
        bucketName:name,
        cards:[]
    });
    console.log("from object" , newBucket.bucketName);
    await newBucket.save();
    res.send({result:"DATA RECEIVED and saved"});
});

router.post('/addcard', async(req,res)=>{
    const name = req.body.name;
    const link = req.body.link;
    const bucketName = req.body.bucketName;
    const bucket = await Bucket.findOne({"bucketName":bucketName});
    bucket.cards.push({name,link});
    await bucket.save();
    res.send({res:"card stored"});
});

router.put('/deleteCard', async(req,res)=>{

    try{
    //const { , name} = req.body;
     const bucketName = req.body.bucketName;
     const name = req.body.name;
    console.log(bucketName,name);
    const bucket = await Bucket.findOne({"bucketName":bucketName});
    const newArray = bucket.cards.filter(x=>{
        return x.name!==name;
    });
    bucket.cards = newArray;
    await bucket.save();
    res.send({data:"suceesfully deleted from database"});
   }
   catch{
      res.send({data:"some error occured in server"});
   }
});

router.get('/getData',async (req,res)=>{

    const bucket = await Bucket.find();
    console.log(bucket);
    res.send({data:bucket});
})

module.exports = router;