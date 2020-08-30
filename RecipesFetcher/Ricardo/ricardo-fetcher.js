var curl = require("curl");
var jsdom = require("jsdom");
var ricardoParsers = require("./ricardo-parsers");

const { JSDOM } = jsdom;
const domain = "https://www.ricardocuisine.com";

class RicardoFetcher {
  constructor(recipesRepository) {
    this.recipesRepository = recipesRepository;
  }

  async fetch() {
    let iterator = new RecipeIterator();
    let index = 1;
    for await (const recipe of iterator.Iterate()) {
      this.recipesRepository.create(recipe);
      console.log(`Recipe ${recipe.name} created (${index})`);
      index++;
    }
  }
}

const n = 3;
class RecipeIterator {
  async *Iterate(onNext) {
    let ingredientsHtml = await httpGet(domain + "/recettes/ingredients");
    const ricardoIngredientsParser = new ricardoParsers.IngredientsPageParser(
      ingredientsHtml
    );
    const ingredientsUrls = ricardoIngredientsParser.getUrls();//.slice(0, n);
    console.log(`${ingredientsUrls.length} recipes found`);
    for (let i = 0; i < ingredientsUrls.length; i++) {
      let ingredientUrl = ingredientsUrls[i];
      let ingredientRecipesHtml = await httpGet(domain + ingredientUrl);
      const ingredientRecipesParser = new ricardoParsers.IngredientRecipesPageParser(
        ingredientRecipesHtml
      );
      const recipesUrls = ingredientRecipesParser.getUrls();//.slice(0, n);
      for (let j = 0; j < recipesUrls.length; j++) {
        let recipeUrl = recipesUrls[j];
        let recipeHtml = await httpGet(domain + recipeUrl);
        const recipeParser = new ricardoParsers.RecipeParser(recipeHtml);
        try {
            let recipe = recipeParser.parse();
            yield recipe;
        } catch(e) {
            console.error(`failed to parse recipe at ${domain + recipeUrl}`);
        }        
      }
    }
  }
}

async function httpGet(url) {
  let promise = new Promise((resolve, reject) => {
    curl.get(url, null, (err, res, html) => {
      if (res.statusCode === 200) {
        resolve(html);
      } else {
        reject(err);
      }
    });
  });

  return promise;
}

module.exports.RicardoFetcher = RicardoFetcher;
