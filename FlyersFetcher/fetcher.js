let igaFetcher = require("./Iga/iga-fetcher.js");
let fyerRepository = require("./flyerRepository.js");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const repo = new fyerRepository.FlyerRepository();

//repo.deleteAll();
var fetcher = new igaFetcher.IgaFetcher();
fetcher.fetch();
