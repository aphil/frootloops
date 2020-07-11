var curl = require("curl");
var jsdom = require('jsdom');
var igaParser = require('./iga-parser');

const { JSDOM } = jsdom;
const url = "https://flyers.iga.net/flyers/igaquebec-quebec/grid_view/549920?type=2&store_code=8253&locale=fr&hide=special%2Cpub";

class IgaFetcher {
    constructor() {
    }

    async fetch() {
        let iterator = new FlyerIterator();

        for await (const offer of iterator.Iterate()) {
            console.log(offer);
        }
    }
}

const n = 3;
class FlyerIterator {
    async * Iterate(onNext) {
        let flyerHtml = await httpGet(url);
        const flyerParser = new igaParser.FlyerPageParser(flyerHtml);
        let offers = flyerParser.getUrls().slice(0, n);
        for (let i = 0; i < offers.length; i++) {
            let productOfferHtml = await httpGet(offers[i]);
            let productParser = new igaParser.ProductOfferPageParser(productOfferHtml);
            yield productParser.getOffer();
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

module.exports.IgaFetcher = IgaFetcher;