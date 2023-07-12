const {
  BAD_REQUEST,
  INTERNAL_SERVER,
  NOT_FOUND,
} = require('../constants/errorCodes');
const {
  saveProduct,
  getProductByProperties,
  getProductsByPropertiesExcludingId,
  updateProductById,
  getAllProducts,
  getProductDetailsById,
} = require('../services/product');
const { renameKeyInArray, renameKey } = require('../utils');
const { isCategoryValid } = require('../utils/category');
const AppError = require('../utils/error');

const getProducts = async (req, res, next) => {
  try {
    const user = req.user;
    const data = await getAllProducts(user.id);
    const products = renameKeyInArray(data ?? [], 'categoryId', 'category');
    return res.status(200).send({
      data: products,
    });
  } catch (error) {
    console.log('error ----> ', error);
    return next(
      new AppError({ message: 'Something Bad Happened' }, INTERNAL_SERVER)
    );
  }
};

const createProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const { categoryId, price, name, description } = req.body;

    const category = await isCategoryValid(categoryId);
    if (!category) {
      return next(
        new AppError({ message: 'Invalid Category Id' }, BAD_REQUEST)
      );
    }

    // check duplication of product name and category
    const isProductDuplicated = await getProductByProperties({
      categoryId,
      name,
    });
    if (isProductDuplicated.length) {
      return next(
        new AppError(
          {
            message: `A product with the name '${name}' and category '${category.name}' already exists. Please provide a different name or category.`,
          },
          BAD_REQUEST
        )
      );
    }

    const payload = {
      categoryId,
      description,
      price,
      name,
      userId: user.id,
    };

    const product = await saveProduct(payload);

    return res.status(200).send({
      message: 'Product Created Successfully !',
      data: product,
    });
  } catch (error) {
    console.log('error ==> ', error);
    return next(
      new AppError({ message: 'Something Bad Happened' }, INTERNAL_SERVER)
    );
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const { categoryId, price, name, description, id } = req.body;

    const category = await isCategoryValid(categoryId);
    if (!category) {
      return next(
        new AppError({ message: 'Invalid Category Id' }, BAD_REQUEST)
      );
    }

    const isProductDuplicated = await getProductsByPropertiesExcludingId(id, {
      categoryId,
      name,
    });
    if (isProductDuplicated.length) {
      return next(
        new AppError(
          {
            message: `A product with the name '${name}' and category '${category.name}' already exists. Please provide a different name or category.`,
          },
          BAD_REQUEST
        )
      );
    }

    const payload = {
      id,
      categoryId,
      description,
      price,
      name,
      userId: user.id,
    };
    await updateProductById(id, payload);

    return res.status(200).send({
      message: 'Product Updated Successfully !',
    });
  } catch (error) {
    console.log('error ==> ', error);
    return next(
      new AppError({ message: 'Something Bad Happened' }, INTERNAL_SERVER)
    );
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const data = await getProductDetailsById(productId);
    if (!data) {
      return next(new AppError({ message: 'Product Not Found' }, NOT_FOUND));
    }
    const product = renameKey(data ?? {}, 'categoryId', 'category');
    return res.status(200).send({
      data: product,
    });
  } catch (error) {
    return next(
      new AppError({ message: 'Something Bad Happened' }, INTERNAL_SERVER)
    );
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
};
