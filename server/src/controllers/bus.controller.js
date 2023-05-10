const express = require("express");
const BusModel = require("../models/bus.model");

const app = express.Router();

app.post("/addnew", async (req, res) => {
  console.log(req.body);
  try {
    let newbus = await BusModel.create({ ...req.body });
    console.log(newbus);
    return res.send(newbus);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post("/getall", async (req, res) => {
  console.log(req.body);
  try {
    let sourceStr = req.body.from;
    let destinationStr = req.body.to;
    // console.log(sourceStr,destinationStr)
    let sourcev = sourceStr.split(" ")
    const source = sourcev[0]
    let destinationv =
      destinationStr.split(" ")
      const destination = destinationv[0]

      console.log(destination,source);
    let allbusses = await BusModel.find({
      from: source,
      to: destination,
    });
    return res.send(allbusses);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post("/one", async (req, res) => {
  console.log("hi");
  try {
    let bus = await BusModel.find({ _id: req.body.id });
    return res.send(bus);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = app;
