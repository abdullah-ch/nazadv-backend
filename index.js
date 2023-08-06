const express = require('express');
const cors = require('cors');

const { connectDB } = require('./src/config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routers/auth');
const userRouter = require('./src/routers/user');
const productRouter = require('./src/routers/product');
const errorHandler = require('./src/middlewares/errorHandler');
const categoryRouter = require('./src/routers/category');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

// handling errors
app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log('listening for requests');
  });
});
