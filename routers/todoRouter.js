const express=require('express')
const { createTodo, allTodo, signalTodo, DeleteTodo, updateTodo } = require('../controllers/todoController')
const auth = require('../middlewares/veryfyToken')
const todoRouter=express.Router()



todoRouter.post('/',auth,createTodo)
todoRouter.get('/',allTodo)
todoRouter.get('/:id',signalTodo)
todoRouter.delete('/:id',DeleteTodo)
todoRouter.put('/:id',updateTodo)

module.exports=todoRouter
