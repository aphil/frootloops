const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: process.env.ELASTIC_SEARCH_URL || "http://localhost:9200" });

class RecipeRepository {
  async create(recipe) {
    recipe.fl_type = "Recipe";
    await client.index({
      index: "frootloops-fr",
      body: recipe,
    });
  }
}

module.exports.RecipeRepository = RecipeRepository;
