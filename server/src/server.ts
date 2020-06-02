import express from "express";

const app = express();

app.use(express.json());

const users = [
    'Gustavo', 
    'Talita', 
    'Felipe', 
    'Diego',
    'Fernando',
    'Ricardo',
    'Jefferson'
]

app.post('/users', (req, res) => {
    const data = req.body;
    return res.json(data);
});

app.get('/users', (req, res) => {
    const search = String(req.query.search);
    const filtrados = search ? users.filter(u => u.includes(search)) : users;
    return res.json(filtrados);
});

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    return res.json(users[id]);
});

app.listen(3333);