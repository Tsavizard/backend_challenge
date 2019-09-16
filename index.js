const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const Bundle = require('./sequelize')
const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

// get all users
app.get('/api/bundles/', (req, res) => {
    Bundle.findAll().then(bundles => res.json(bundles))
})

//create new
app.post('/api/bundles/createNew', (req, res) => {
    const Op = Sequelize.Op
    Bundle.count ({ where: {product_name:{ [Op.or]: [req.body.prodName, req.body.prodCode]}} })
        .then(count  => {
            if (count != 0) {
                res.send("Product exists");
            }else {
                Bundle.create({
                    product_name: req.body.prodName,
                    price: req.body.price,
                    product_code: req.body.prodCode,
                    product_exp_date: req.body.prodExp,
                    availability: req.body.availability
                }).then(bundle => res.json(bundle))
            }
        })
})
        

//get by name
app.get('/api/bundles/viewByProdName/:prodName',(req, res) => {
    Bundle.findOne({ where: {product_name: req.params.prodName} }).then(bundle => res.json(bundle))
});

//get by price asc
app.get('/api/bundles/viewByPriceAsc/:price',(req, res) => {
    Bundle.findAll({ where: {price: req.params.price},order: [['product_name', 'ASC']]}).then(bundle => res.json(bundle))
});

//get by price desc
app.get('/api/bundles/viewByPriceDesc/:price',(req, res) => {
    Bundle.findAll({ where: {price: req.params.price},order: [['product_name', 'DESC']]}).then(bundle => res.json(bundle))
});

//get by code
app.get('/api/bundles/viewByProdCode/:prodCode',(req, res) => {
    Bundle.findOne({ where: {product_code: req.params.prodCode} }).then(bundle => res.json(bundle))
});

//activate product
app.patch('/api/bundles/activateProduct/:id',(req, res) => {
    Bundle.update({active: 1},{ where: {id: req.params.id} })
    .then(bundle => {res.json(bundle)})
});

//deactivate product
app.patch('/api/bundles/deactivateProduct/:id',(req, res) => {
    Bundle.update({active: 0},{ where: {id: req.params.id} })
    .then(bundle => {res.json(bundle)})
});

//delete product
app.delete('/api/bundles/deleteProduct/:id',(req, res) => {
    Bundle.destroy({ where: {id: req.params.id} })
    .then(bundle => {res.json(bundle)})
});

const port = 4000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})