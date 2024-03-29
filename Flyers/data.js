const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: process.env.ELASTIC_SEARCH_URL || "http://localhost:9200" });
const indexName = "frootloops-fr";

class FlyersRepository {
    async GetAll() {
        try {
            let flyersResponse = (await client.search({
                index: indexName,
                body: {
                    query: {
                        bool: {
                            filter: {
                                match: { fl_type: "Flyer" },
                            },
                        },
                    }
                },
            }));

            let flyers = flyersResponse.body.hits.hits.map(hit => {
                return {
                    name: hit._source.FullDisplayName,
                    imageUrl: hit._source.ProductImageUrl,
                    sourceUrl: hit._source.ProductUrl
                }
            });
    
            return flyers
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
                            match: { fl_type: "Flyer" },
                        },
                    },
                }
            }
        });
    }
}

module.exports.FlyersRepository = FlyersRepository;
