const Koder = require("../models/koders.models");
const mongoose = require("mongoose");
const createError = require("http-errors");

async function getAll() {
  const allKoders = await Koder.find();
  return allKoders;
}

async function create(koderData) {
  const newKoder = await Koder.create(koderData);
  return newKoder;
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "invalid ID");
  }
  const koder = await Koder.findById(id);
  return koder;
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "invalid ID");
  }
  const koderDeleted = await Koder.findByIdAndDelete(id);
  if (!koderDeleted) {
    throw new createError(404, "koder not found");
  }
  return koderDeleted;
}

async function updateById(id, newKoderData) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "invalid ID");
  }
  const koderUpdated = await Koder.findByIdAndUpdate(id, newKoderData, {
    new: true,
  });
  if (!koderUpdated) {
    throw new createError(404, "not found");
  }
  return koderUpdated;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
