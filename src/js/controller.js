
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeView.js'
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


const controlRecipes = async function(){
  // Loading the recipe
  try{

    const id=window.location.hash.slice(1);

    if(!id) return
     
    RecipeView.spinner()

    await model.loadRecipe(id);
    
    //Rendering the recipe
    RecipeView.render(model.state.recipe);
// const {recipe} = model.state;
    
  } catch(err){
    alert(err)
  }
}

window.addEventListener('hashchange',  controlRecipes);
window.addEventListener('load',  controlRecipes);

