var jsdom = require('jsdom');
var {Offer} = require('../Models/Offer')


const { JSDOM } = jsdom;

class FlyerPageParser {
    constructor(html) {
        this.html = html;
    }
    getUrls() {
        const flyerDom = new JSDOM(this.html);
        let json = this.html.match(/window\['flyerData'\] = (.*);/)[1];

        let flyerData = JSON.parse(json);
        let urls = flyerData.items.map(i => i.url);

        return urls;
    }
}

class ProductOfferPageParser {
    constructor(html) {
        this.html = html;
    }
    getOffer() {
        const flyerDom = new JSDOM(this.html);
        const $ = (require('jquery'))(flyerDom.window);
        return JSON.parse($("[data-product]")[0].getAttribute("data-product").replace(/'/g, '"'));
    }
}

module.exports.FlyerPageParser = FlyerPageParser;
module.exports.ProductOfferPageParser = ProductOfferPageParser;