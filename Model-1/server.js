const express = require('express');
const app = express();
const axios = require('axios').default
app.use(express.json());
const client = require('./client');

app.get('/', async function(req, res){
    let catchValue = await client.get('todos');
    if(catchValue)
        return res.json(JSON.parse(catchValue));

    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');
    await client.set('todos', JSON.stringify(data));
    await client.expire('todos',30);
    return res.json(data);
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})