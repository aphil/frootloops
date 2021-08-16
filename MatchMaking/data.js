const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: process.env.ELASTIC_SEARCH_URL || "http://localhost:9200" });
const indexName = "frootloops-fr";

class MatchesRepository {
    async GetAll() {
        const flyers = (
            await client.search({
                size: 500,
                index: indexName,
                body: {
                    query: {
                        match: {
                            fl_type: "Flyer",
                        },
                    },
                },
            })
        ).body.hits.hits.map((x) => x._source);

        let receipesResponse = (await client.search({
            size: 50,
            index: indexName,
            body: {
                query: {
                    bool: {
                        should: flyers.map((f) => {
                            return { match_phrase: { ingredients: f.FullDisplayName } };
                        }),
                        filter: {
                            match: { fl_type: "Recipe" },
                        },
                    },
                },
                highlight: {
                    fields: {
                        ingredients: {},
                    },
                    pre_tags: "<span style='color:red'>",
                    post_tags: "</span>"
                },
            },
        }));

        let recipes = receipesResponse.body.hits.hits.map(x => {
            return {
                name: x._source.name,
                ingredients: x._source.ingredients,
                imageUrl: x._source.imageUrl,
                highlight: x.highlight
                
            }
        });

        return recipes;
    }
}

module.exports.MatchesRepository = MatchesRepository;
