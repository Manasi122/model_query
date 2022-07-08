const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));


const router = require('./routes/clientRouter.js')
app.use('/api/client', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server up on ${PORT}`);
})