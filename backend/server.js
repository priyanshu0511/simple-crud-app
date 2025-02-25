const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product.routes');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api/products/', productRoutes);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
