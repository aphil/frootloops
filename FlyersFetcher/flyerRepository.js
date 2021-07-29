const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: process.env.ELASTIC_SEARCH_URL || "http://localhost:9200" });

class FlyerRepository {
  async create(flyer) {
    flyer.fl_type = "Flyer";
    await client.index({
      index: "frootloops-fr",
      body: flyer,
    });
  }
  async deleteAll() {
    await client.deleteByQuery({
      index: "frootloops-fr",
      body: {
        query: {
          match: {
            fl_type: "Flyer",
          },
        },
      },
    });
  }
}

module.exports.FlyerRepository = FlyerRepository;
