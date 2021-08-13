const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: process.env.ELASTIC_SEARCH_URL || "http://localhost:9200",
});
const indexName = "frootloops-fr";

class RecipeRepository {
  async GetAll() {
    try {
      let recipesResponse = await client.search({
        size: 50,
        index: indexName,
        body: {
          query: {
            bool: {
              filter: {
                match: { fl_type: "Recipe" },
              },
            },
          },
        },
      });

      let recipes = recipesResponse.body.hits.hits.map((hit) => {
        return {
          name: hit._source.name,
          ingredients: hit._source.ingredients,
          sourceUrl: hit._source.url,
          imageUrl: hit._source.imageUrl,
        };
      });
  
      return recipes;
    } catch (e) {
      return [];
    }
  }

  async DeleteAll() {
    client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          bool: {
            filter: {
              match: { fl_type: "Recipe" },
            },
          },
        },
      },
    });
  }
}

module.exports.RecipeRepository = RecipeRepository;
