const Category = require('../models/category.js');

//add a category
exports.addCategory = (req, res) => {
  try {
    const { name, parent, totalSales, targetSales } = req.body;
    const progress = (totalSales / targetSales) * 100;
    const progressLabel =
      (progress <= 33 && 'Red') ||
      (progress > 33 && progress <= 66 && 'Yellow') ||
      (progress > 66 && 'Green');
    const category = new Category({
      name,
      parent,
      totalSales,
      targetSales,
      progress,
      progressLabel,
    });
    category
      .save()
      .then((data) => {
        if (data.parent) {
          Category.findOneAndUpdate(
            { _id: data.parent },
            { $push: { children: data._id } },
          ).then((response) => {
            Category.findOneAndUpdate(
              { _id: data._id },
              { parents: [...response.parents, req.body.parent] },
            ).then(() => {
              return res.status(200).json({
                message: 'Category created successfully!',
              });
            });
          });
        } else {
          return res.status(200).json({
            message: 'Category created successfully!',
          });
        }
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        return res.status(400).json({
          error: 'Creating category in DB is failed!',
        });
      });
  } catch (err) {
    console.log(err, 'ERROR');
  }
};

//update category (if target is not provided we can find the elemeent and get it could not implement it due to time constraint)
exports.updateCategory = (req, res) => {
  try {
    const _id = req.params.id;
    const { name, totalSales, targetSales } = req.body;
    const progress = (totalSales / targetSales) * 100;
    const progressLabel =
      (progress <= 33 && 'Red') ||
      (progress > 33 && progress <= 66 && 'Yellow') ||
      (progress > 66 && 'Green');
    Category.findOneAndUpdate(
      { _id },
      { totalSales, name, targetSales, progress, progressLabel },
    )
      .then(() => {
        return res.status(200).json({
          message: 'Category updated successfully!',
        });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        return res.status(400).json({
          error: 'Error updating category',
        });
      });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

// get the root level
exports.getCategory = (req, res) => {
  try {
    Category.find({ parent: null })
      .then((data) => {
        return res.status(200).json({
          message: 'Top level category fetched successfully!',
          data: data,
        });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        return res.status(400).json({
          error: 'Error fetching top level category',
        });
      });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

//get children of a category or the next level
exports.getCategoryChildren = (req, res) => {
  const id = req.params.id;
  try {
    Category.find({ parent: id })
      .then((data) => {
        return res.status(200).json({
          message: 'Children category fetched successfully!',
          data: data,
        });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        return res.status(400).json({
          error: 'Error fetching children category',
        });
      });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

//get parents of a category
exports.getCategoryParents = (req, res) => {
  const id = req.params.id;
  try {
    Category.findOne({ _id: id }).then((data) => {
      Category.find({ _id: { $in: data.parents } })
        .then((response) => {
          return res.status(200).json({
            message: 'Parents fetched successfully!',
            data: response,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: 'Error fetching parents',
          });
        });
    });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

//delete only a single category and make children independent
exports.deleteOnlyCategory = (req, res) => {
  const _id = req.params.id;
  try {
    Category.findOne({ _id }).then((data) => {
      Category.deleteOne({ _id }).then(() => {
        Category.findByIdAndUpdate(
          { _id: data.children },
          { parent: null },
        ).then(() => {
          Category.findOneAndUpdate(
            { _id: data.parent },
            { $pop: { children: _id } },
          );
          return res.status(200).json({
            message: 'Category deleted successfully!',
          });
        });
      });
    });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

//Delete Complete category Link
exports.deleteCompleteLink = (req, res) => {
  const _id = req.params.id;
  try {
    Category.findOne({ _id }).then((data) => {
      Category.deleteMany({ parents: { $in: [_id] } })
        .then(() => {
          Category.deleteOne({ _id }).then(() => {
            return res.status(200).json({
              message: 'Category and link deleted successfully!',
            });
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: 'Error deleting category and link',
          });
        });
    });
  } catch (error) {
    console.log(err, 'ERROR');
  }
};

exports.delete;
