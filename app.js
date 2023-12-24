const express = require('express')
const res = require('express/lib/response')
const db = new Map()

const app = express()

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    return res.send("Hello Dunia")
})

app.post('/todos', (req, res) => {

    db.set("123", req.body)

    return res.json({"Success create todo : " : req.body})
})

app.get('/todos', (req, res) => {

    const data = Array.from(db.values())
    return res.json({
        data
    })

})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    const data = db.get(id)
    return res.json(data)
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    const data = db.delete(id)
    return res.json({massage: "Success delete todo"})
})

app.put('/todos/:id', (req, res) => {
    const id = req.params.id
    db.set(id, res.body)
    return res.json({massage: "Success update todo"})
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id

    const existingTodo = db.get(id);
    const updatedTitle = { title: req.body.title, description: existingTodo.description };
    db.set(id, updatedTitle);

    return res.json({massage: "Success update todo title"})
})

app.listen(port, () => {
    console.log('Listen on localhost:' + port)
})
