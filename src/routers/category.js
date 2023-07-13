const express = require('express');
const categoryRouter = express.Router();
const { verifyToken } = require('../middlewares/auth');
const { getCategories } = require('../controllers/category');

categoryRouter.get('/', verifyToken, getCategories);

module.exports = categoryRouter;
