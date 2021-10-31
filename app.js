const express = require('express')
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const errorHandler = require('./helpers/error-handler')
const authJwt = require('./helpers/jwt')

app.use(cors());
app.options('*',cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('public/uploads', express.static(__dirname + '/public/uploads'));


const api = process.env.API_URL;

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


//Routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Gen21Cars'
})
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err);
})

app.listen(3000,()=>{
    console.log('Running 3000');
})