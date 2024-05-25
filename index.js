const express = require("express")

const server = express();
//Le indicamos al server que vamos a recibir json
server.use(express.json())

const todos = []

//listar los To Dos
server.get('/todos',(req,res)=>{

    res.json({
        message:'all To Dos',
        todos: todos
    })
})

//crear los To Dos
server.post('/todos',(req,res)=>{

    const newTodo = req.body.todo
    //si no hay todo entonces se pone un status de 404 y se manda el mensaje de:  todo is required
    if(!newTodo){
        res.status(400)
        res.json({
            message:'todo is required'
        })
        //si no se agrega el return entonces no se va a detener y de todas formas se va a agregar el todo vacío
        return
    }

    todos.push(newTodo)

    res.json({
        message:'new To Do added',
        todos: todos
    })

})

//Eliminar un To Do
/*
Para eliminar un ToDo se tiene que tener un ID del ToDo por lo que cuando se le pone : "dos puntos" 
se le indica a express que ese valor va a cambiar / ser dinámico o que simplemente se va a recibir algo
*/
server.delete('/todos/:idx',(req,res)=>{
    const indexToDelete = req.params.idx;
    const indexAsInteger= parseInt(indexToDelete)

    if(isNaN(indexAsInteger) ){
        res.status(400)
        res.json({
            message:'invalid index, must be a number'
        })
        
        return
    }

    if(indexAsInteger < 0 || indexAsInteger >= todos.length){
        res.status(400)
        res.json({
            message:'invalid index, out of bound'
        })
        
        return
    }

    todos.splice(indexAsInteger,1)

    res.json({
        message:'To do deleted successfully',
        todos: todos
    })
    
})

server.listen(8080,()=>{
    console.log(('Server running on port 8080'))
})