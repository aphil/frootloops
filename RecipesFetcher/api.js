var express = require("express");
var app = express();
let ricardoFetcher = require("./Ricardo/ricardo-fetcher.js");
let { RecipeRepository } = require("./Repositories/jsonRecipeRepository");

let recipeRepo = new RecipeRepository();
var fetcher = new ricardoFetcher.RicardoFetcher(recipeRepo);

app.post("/recipes/fetcher/start", async (req, res) => {
    fetcher.fetch();
    res.status(202).json({ status: "Processing data.." });
});

app.get("/recipes/fetcher/status", async (req, res) => {
    res.json({
        status: fetcher.status,
        index: fetcher.index
    });
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});