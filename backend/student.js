const express = require("express")
const studentRouter = express.Router();

const student = require("./models/student")

studentRouter.get("/",async(req,res)=>{
    try{
        const s = await student.find()
        res.send(s)
    }
    catch(error){
        console.log(error)
    }
})

studentRouter.post("/",async(req,res)=>{
    const {name,age}=req.body
    const newstudent = new student({name,age})
    await newstudent.save()
    res.send("data inserted")
})

studentRouter.delete("/:id",async(req,res)=>{
    try{
        await student.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:true,
            message:"data deleted",
            data:req.params.id
        })
        
    }catch(error){
            console.log(error)
        }
})

studentRouter.put("/:id",async(req,res)=>{
    const {name,age} = req.body
    try{
        await student.findByIdAndUpdate(
            req.params.id,
            {name,age},
            {new:true,runValidators:true}
        )
        res.json({message:"updated"})
        
    }catch(error){
        console.log(error)
    }
})

studentRouter.patch("/:id",async(req,res)=>{
    
    try{
        await student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        )
        res.json({message:"updated"})
        
    }catch(error){
        console.log(error)
    }
})
module.exports = studentRouter


























// const express = require("express")
// const router = express.Router();

// let records = []

// router.get("/", (req, res) => {
//     res.send(records)
// })

// router.post("/", (req, res) => {
//     records.push(req.body)
//     res.send("Data Recieved!!!")

// })

// router.put("/", (req, res) => {
//     res.send("student put")

// })
// router.patch("/", (req, res) => {
//     res.send("student patch")

// })
// router.delete("/", (req, res) => {
//     let {age} = req.body
//     records = records.filter(records => records.age !== age);

//     res.send("student delete")

// })
// module.exports = router