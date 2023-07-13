const { getAllCategories } = require('../services/category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).send({
      data: categories,
    });
  } catch (error) {
    return next(
      new AppError({ message: 'Something Bad Happened' }, INTERNAL_SERVER)
    );
  }
};

module.exports = {
  getCategories,
};
