require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes= require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.get('/', (req, res) => {
    res.json({message: 'Success!'});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server ir running!');
    console.log(`Server port: ${PORT}`);
});