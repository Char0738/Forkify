
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeView.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';


const recipeContainer = document.querySelector('.recipe');




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
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{
    
    
    
     const query = searchView.getQuery();
     if (!query) return;

    //  await model.loadSearchResults(query);
    // console.log(model.state.search.results);

  }catch(err){
    console.log(err)
  }
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  // searchView.addHandlerSearch(controlSearchResults);
}

init()
