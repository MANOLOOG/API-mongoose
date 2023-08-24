const express = require("express");
const koders = require("../usecases/koders.usecase");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allKoders = await koders.getAll();
    response.json({
      message: "koders list",
      data: {
        koders: allKoders,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: "Somthing went wrong",
      error: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const koderData = request.body;
    const newKoder = await koders.create(koderData);
    response.status(201);
    response.json({
      message: "Koder created",
      data: {
        koder: newKoder,
      },
    });
  } catch (error) {
    response.status(error.name === "validationError" ? 400 : 500);

    response.json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const koder = await koders.getById(id);
    response.json({
      message: "koder finded",
      data: { koder },
    });
  } catch (error) {
    console.log(error.status);
    response.status(error.status || 500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const koder = await koders.deleteById(id);

    response.json({
      message: "koder deleted",
      data: { koder },
    });
  } catch (error) {
    console.log(error.status);
    response.status(error.status || 500).json({
      message: "error deleting koder",
      error: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const newData = request.body;
    const koderUpdate = await koders.updateById(id, newData);

    response.json({
      message: "koder updated",
      data: { koder: koderUpdate },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      message: "error updating koder",
      error: error.message,
    });
  }
});

module.exports = router;
