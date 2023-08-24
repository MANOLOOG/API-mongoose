const express = require("express");
const Practice = require("../usecases/practice.usecase");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allpractices = await Practice.getAll();
    response.json({
      message: "Practices list",
      practices: { allpractices },
    });
  } catch (error) {
    response.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const practiceData = request.body;
    const newPractice = await Practice.create(practiceData);

    response.status(201);
    response.json({
      message: "Practice created",
      data: {
        practice: newPractice,
      },
    });
  } catch (error) {
    response.status(error.name === "validationError" ? 400 : 500);
    response.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const practice = await Practice.getById(id);
    response.json({
      message: "practice finded successfully",
      data: {
        practice,
      },
    });
  } catch (error) {
    console.log(error.status);
    response.status(error.status || 500).json({
      message: "error finding practice",
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const practice = await Practice.deleteById(id);
    response.json({
      message: "practice deleted successfully",
      data: { practice },
    });
  } catch (error) {
    console.log(error.status);
    response.status(error.status || 500).json({
      message: "error deleting practice",
      error: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const newData = reques.body;
    const practiceUpdate = await Practice.updateById(id, newData);

    response.json({
      message: "practice updated successfully",
      data: {
        practice: practiceUpdate,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      message: "error updating practice",
      error: error.message,
    });
  }
});

module.exports = router;
