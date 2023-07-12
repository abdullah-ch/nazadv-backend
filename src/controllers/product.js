const { BAD_REQUEST, INTERNAL_SERVER } = require('../constants/errorCodes');
const {
  saveProduct,
  getProductByProperties,
  getProductsByPropertiesExcludingId,
  updateProductById,
} = require('../services/product');
const { isCategoryValid } = require('../utils/category');
const AppError = require('../utils/error');

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
    return next(new AppError({ message: error.message }, BAD_REQUEST));
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
    return next(new AppError({ message: error.message }, BAD_REQUEST));
  }
};
module.exports = {
  createProduct,
  updateProduct,
};
