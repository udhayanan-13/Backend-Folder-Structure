import {
  insertProduct,
  getAllProduct,
  updateProductModel,
  deleteProductModel,
  updateStatusModel,
} from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  console.log("im in add product controller.. ", req.body);
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  const { name, categoryId, description, price, status } = req.body;
  console.log(
    "Im in add Product controller.",
    name,
    categoryId,
    description,
    price,
    status
  );
  try {
    await insertProduct(name, categoryId, description, price, status);
    res.status(201).send({ message: "Product added successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error in adding Product", error: err || err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const result = await getAllProduct();
    res.status(201).send(result);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error in getting all categories", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  console.log(req.body);
  const { id, name, categoryId, description, price, status } = req.body;
  console.log("In update Product controller", id, description);
  try {
    await updateProductModel(id, name, categoryId, description, price, status);
    res.status(201).send({ message: "Product updated successfully" });
  } catch (err) {
    res.status(400).send({
      message: "Error in updating Product",
      error: err || err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProductModel(id);
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(401)
      .send({ message: "Can't delete product!", error: err || err.message });
  }
};

export const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    await updateStatusModel(id, status);
    res.status(200).send({ message: "Product status updated successfully" });
  } catch (err) {
    res.status(401).send({
      message: "Can't update product status!",
      error: err || err.message,
    });
  }
};
