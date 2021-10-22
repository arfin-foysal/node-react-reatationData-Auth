const Todo = require("../schemas/todoSchema")
const User = require("../schemas/userSchema")


// Create Todo
const createTodo = async (req, res) => {
 
    const todo = new Todo({
      ...req.body,
      user:req.userid
    })
    try {
        const saveTodo = await todo.save()
        await User.updateOne({
            _id:req.userid
        },{
            $push:{
                todos:saveTodo._id
        }})
        res.status(200).json(
            {
                mess:"task seve",
                dataa:saveTodo
            }
        )
        
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}
// get Todo
const allTodo=async(req,res)=>{
    
    try {
        const todos= await Todo.find().populate("user")
         
        res.status(200).json({todos})
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}

// signalTodo

const signalTodo=async(req,res)=>{
    const id = req.params.id
    try {
        const todos= await Todo.findById(id)
        res.status(200).json({todos})
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}

// DeleteTodo

const DeleteTodo=async(req,res)=>{
    const id = req.params.id
    try {
        const todos= await Todo.findByIdAndDelete(id)
        res.status(200).json({ todos })
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}

// updateTodo
const updateTodo=async(req,res)=>{
    const id = req.params.id
    const {title}= req.body
    try {
        const todo= await Todo.findOneAndUpdate(
            {_id:id},
            {$set:{title}},{new:true})
        res.status(200).json({ todo })
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}


module.exports = {
    createTodo,
    allTodo,
    signalTodo,
    DeleteTodo,
    updateTodo
}
