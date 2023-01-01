const fs = require('fs');

class JsonRecipeRepository {
    constructor(filePath) {
        this.filePath = filePath || "recipes-export.json";
        let recipesFile = fs.existsSync(this.filePath) ? fs.readFileSync(this.filePath) : null;
        if (recipesFile) {
            this.recipes = JSON.parse(recipesFile);
        } else {
            this.recipes = [];
        }
    }
  async create(recipe) {
    this.recipes.push(recipe);
    fs.writeFileSync('punishmenthistory.json', this.filePath);
  }
}

module.exports.RecipeRepository = JsonRecipeRepository;
