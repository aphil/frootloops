var express = require("express");
let { MatchesRepository } = require("./data.js");
var app = express();

app.get("/matches", async (req, res) => {
    let matchesRepo = new MatchesRepository();
    let matches = await matchesRepo.GetAll();
    res.json(matches);
});

app.listen(3006, () => {
    console.log("Server running on port 3006");
});