const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const indexName = "frootloops-fr";

class RecipeRepository {
    async GetAll() {
        // let recipesResponse = (await client.search({
        //     size: 50,
        //     index: indexName,
        //     body: {
        //       query: {
        //         bool: {
        //           filter: {
        //             match: { fl_type: "Recipe" },
        //           },
        //         },
        //       }
        //     },
        //   }));
        
        //   let recipes = recipesResponse.body.hits.hits;

        let recipes = [
            { id: "a", name: "courges" }
        ];
        return recipes
    }
}

module.exports.RecipeRepository = RecipeRepository;
