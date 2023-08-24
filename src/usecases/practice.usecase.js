const mongoose = require("mongoose");
const createError = require("http-errors");

const Practice = require("../models/practice.model");

async function getAll() {
  return await Practice.find();
}

async function create(practiceData) {
  return await Practice.create(practiceData);
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Id not valid");
  }
  const practice = await Practice.findById(id);

  if (!practice) {
    throw new createError(404, "Not Found");
  }
  return practice;
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Id not valid");
  }
  const practice = await Practice.findByIdAndDelete(id);

  if (!practice) {
    throw new createError(404, "Not Found");
  }
}

async function updateById(id, newPracticeData) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Id not valid");
  }
  const practiceUpdated = await Practice.findByIdAndUpdate(
    id,
    newPracticeData,
    { new: true }
  );
  if (!practiceUpdated) {
    throw new createError(404, "Not Found");
  }
  return practiceUpdated;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
