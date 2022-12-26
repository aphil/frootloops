//var curl = require("curl");
var request = require("request");
var jsdom = require("jsdom");
var igaParser = require("./iga-parser");
var { FlyerRepository } = require("../Repositories/flyerRepository");
const puppeteer = require("puppeteer");
var fs = require('fs');

const { JSDOM } = jsdom;
const url =
  "https://flyers.iga.net/flyers/igaquebec-quebec/grid_view/549920?type=2&store_code=8253&locale=fr&hide=special%2Cpub";

class IgaFetcher {
  constructor() {
    this.flyerRepo = new FlyerRepository();
    this.browser = null;
    this.index = 0;
  }

  async fetch() {
    this.browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    let iterator = new FlyerIterator();
    this.index = 1;
    let offers = [];
    for await (const offer of iterator.Iterate(this.browser)) {
      try {
        //this.flyerRepo.create(offer);
        console.log(`offer ${offer.FullDisplayName} created (${this.index})`);
        this.index++;
        offers.push(offer)
      } catch (e) {
        console.error(e);
      }
    }

    await this.browser.close();
    fs.writeFile('flyers.json', JSON.stringify(offers), 'utf8', function (err) {
      if (err) throw err;
      console.log('complete');
    });

  }
}

const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const n = 3;
class FlyerIterator {
  async *Iterate(browser) {
    let flyerHtml = await httpGet(browser, url);
    const flyerParser = new igaParser.FlyerPageParser(flyerHtml);
    let offers = flyerParser.getUrls().slice(0, n);
    console.log(`found ${offers.length} offers in flyer`);
    for (let i = 0; i < offers.length; i++) {
      try {
        let productOfferHtml = await httpGet(browser, offers[i]);
        let productParser = new igaParser.ProductOfferPageParser(
          productOfferHtml
        );

        let offer = productParser.getOffer();
        if (offer) {
          yield offer;
        }
      } catch (e) {
        console.error(`failed getting offer ${offers[i]}`);
      }

      //await snooze(1000);
    }
  }
}

async function httpGet(browser, url) {
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
  );
  await page.goto(url);

  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  await page.close();
  return bodyHTML;
}

module.exports.IgaFetcher = IgaFetcher;
