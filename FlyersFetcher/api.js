var express = require("express");
var app = express();
let igaFetcher = require("./Iga/iga-fetcher.js");
let { FlyerRepository } = require("./Repositories/flyerRepository");

let flyerRepo = new FlyerRepository();
var fetcher = new igaFetcher.IgaFetcher(flyerRepo);

app.post("/flyers/fetcher/start", async (req, res) => {
    fetcher.fetch();
    res.status(202).json({ status: "Processing data.." });
});

app.get("/flyers/fetcher/status", async (req, res) => {
    res.json({
        status: fetcher.status,
        index: fetcher.index
    });
});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});