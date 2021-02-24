var express = require("express");
let { FlyersRepository } = require("./data.js");
var app = express();

app.get("/flyers", async (req, res) => {
    let flyersRepo = new FlyersRepository();
    let flyers = await flyersRepo.GetAll();
    res.json(flyers);
});

app.delete("/flyers", async (req, res) => {
    let flyersRepo = new FlyersRepository();
    await flyersRepo.DeleteAll();
    res.end();
});

app.listen(3004, () => {
    console.log("Server running on port 3004");
});