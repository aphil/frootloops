class Recipe {
    constructor(name, ingredients, url, imageUrl) {
        this.name = name;
        this.ingredients = ingredients;
        this.url = url;
        this.imageUrl = imageUrl;
    }
}

module.exports.Recipe = Recipe;