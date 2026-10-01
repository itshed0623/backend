const express = require('express'); //import express
const cors = require('cors'); //import cors
const app = express();

app.use(express.json());
app.use(cors());

let products = [
    {
        id: 1,
        name: 'Laptop',
        price: 190
    },
    {
        id: 2,
        name: 'iPhone',
        price: 290
    }

]

let nextID = 3;

app.get('/api/product', (req, res) => {
    res.json(products); //sends a json type data
});

app.post('/api/product', (req, res) => {
    console.log(req.body); 

    const newData = { 
        id: nextID++,
        name: req.body.name,
        price: Number(req.body.price),
    }

    products.push(newData);

    res.json(newData); 

})

app.put('/api/product/:id', (req, res) => {
    const { id } = req.params;

    //makuha yung id nung nirerequest ng frontend na iedit
    const editID = products.findIndex((p) => p.id === Number(id));

    products[editID] = {
        id: Number(id),
        name: req.body.name,
        price: req.body.price 
    }

    res.json(products[editID]);
    console.log(products[editID]);
})

// http::/localhost:8080/api/product/3    -> params


app.delete('/api/product/:id', (req, res) => {
    const { id } = req.params;

    products = products.filter((p) => p.id !== Number(id));
    console.log(products);

    res.json(Number(id)); 
})
 
app.listen(8080, () => {
    console.log('Server running with 8080');
})
