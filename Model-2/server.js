const express = require('express');
const app = express();
const axios = require('axios').default;
const DEFAULT_EXP = 3600;
const client = require('./client');

app.use(express.json());
app.use(express.urlencoded({ extended : true }))

app.use('/photos', async (req, res) => {
        let albumId = req.query.albumId;
        let cacheData = await client.get(`photos?albumId=${albumId}`);
        if(cacheData){
            console.log("Cache Hit");
            return res.json(JSON.parse(cacheData));
        }
        else{
            console.log("Cache Miss");
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", 
                { params : { albumId }}
            );
            await client.set(`photos?albumId=${albumId}`, JSON.stringify(data));
            await client.expire(`photos?albumId=${albumId}`, DEFAULT_EXP);
            return res.json(data);
        }

})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})