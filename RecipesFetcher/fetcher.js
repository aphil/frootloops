let ricardoFetcher = require("./Ricardo/ricardo-fetcher.js");
//let { RecipeRepository } = require("./recipeRepository");
let { RecipeRepository } = require("./Repositories/jsonRecipeRepository");

let recipeRepo = new RecipeRepository();
var fetcher = new ricardoFetcher.RicardoFetcher(recipeRepo);
fetcher.fetch();
