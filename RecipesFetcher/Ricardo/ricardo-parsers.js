var jsdom = require('jsdom');
var {Recipe} = require('../Models/Recipe')


const { JSDOM } = jsdom;

class IngredientsPageParser {
    constructor(html) {
        this.html = html;
    }
    getUrls() {
        const ingredientsDom = new JSDOM(this.html);
        const $ = (require('jquery'))(ingredientsDom.window);
        return $(".list-categories-recipes").find("div.item-picture > a").map((index, ingredientLink) => { 
            return $(ingredientLink).attr("href");
        }).toArray();
    }
}

class IngredientRecipesPageParser {
    constructor(html) {
        this.html = html;
    }

    getUrls()  {
        const ingredientFilterDom = new JSDOM(this.html);
        const $ = (require('jquery'))(ingredientFilterDom.window);
        return $("ul.item-list").find("div.item-picture > a").map((index, recipeLink) => {
            return $(recipeLink).attr("href");
        }).toArray();
    }

    getNextPageUrl() {
        const ingredientFilterDom = new JSDOM(this.html);
        const $ = (require('jquery'))(ingredientFilterDom.window);
        return $("div.pagination").find("li.nextPage > a").attr("href");
    }
}

class RecipeParser {
    constructor(html) {
        this.html = html;
    }

    parse() {
        const recipeDom = new JSDOM(this.html);
        const $ = (require('jquery'))(recipeDom.window);
        
        let recipeJsonText = $("script[type='application/ld+json']").html();
        let jsonLdRecipe = JSON.parse(recipeJsonText);
        let canonicalUrl = $("link[rel='canonical']").attr("href");
        return new Recipe(jsonLdRecipe.name, jsonLdRecipe.recipeIngredient, canonicalUrl);
    }
}

module.exports.IngredientsPageParser = IngredientsPageParser;
module.exports.IngredientRecipesPageParser = IngredientRecipesPageParser;
module.exports.RecipeParser = RecipeParser;