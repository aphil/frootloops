var express = require("express");
let { RecipeRepository } = require("./data.js"); 
var app = express();

app.get("/recipes", async (req, res) => {
    let recipeRepo = new RecipeRepository();    
    let recipes = await recipeRepo.GetAll();
    res.json(recipes);
});

app.listen(3002, () => {
 console.log("Server running on port 3002");
});