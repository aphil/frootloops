const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const fs = require("fs");
const indexName = "frootloops-fr";

(async function () {
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

  let html = "";

  // for (let i = 0; i < flyers.length; i++) {
  //   let flyer = flyers[i];
  //   let receipesResponse = await client.search({
  //     index: indexName,
  //     body: {
  //       query: {
  //         bool: {
  //           must: [{ match_phrase: { ingredients: flyer.FullDisplayName } }],
  //           filter: {
  //             match: { fl_type: "Recipe" },
  //           },
  //         },
  //       },
  //       highlight: {
  //         fields: {
  //           ingredients: {},
  //         },
  //         pre_tags: "<span style='color:red'>",
  //         post_tags: "</span>",
  //       },
  //     },
  //   });

  //   let recipes = receipesResponse.body.hits.hits;
  //   if (recipes.length) {
  //     html += `<h3>${flyer.FullDisplayName}</h3>`;
  //     html += recipes.map((x) => {
  //       return `
  //         <div>
  //             <div>${JSON.stringify(x._source, null, 2)}</div>
  //             <br />
  //             <div>${JSON.stringify(x.highlight, null, 2)}</div>
  //         </div>    
  //     `;
  //     });
  //   }
  // }
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

  let recipes = receipesResponse.body.hits.hits;

  html = recipes.map(x => {
    return `
        <div>
            <div>${JSON.stringify(x._source, null, 2)}</div>
            <br />
            <div>${JSON.stringify(x.highlight, null, 2)}</div>
        </div>
    `
  })

  fs.writeFileSync("C:\\temp\\recipes.html", html);
  // console.log(recipes);
})();
