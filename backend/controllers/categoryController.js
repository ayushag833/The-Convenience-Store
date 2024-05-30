import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists!" });
    }

    const category = await new Category({ name }).save();
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.categoryId;

    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(400).json({ error: "Category does not exists!" });
    }

    category.name = name;
    const updatedCategory = await category.save();
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    return res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    return res.status(200).json(all);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory,
};
