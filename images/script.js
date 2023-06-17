const appId = "d557a6fd";
const appkey = "050080d60e6812c65b77db2e3b28f6ff";
const baseurl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appkey}`;
const recipeContainer = document.querySelector('#recipe-container');
const textSearch = document.querySelector('#textSearch'); //for text search
const btnFind=document.querySelector('.btn');
const loadingEle = document.querySelector('#loading');
//--------for enabling the find button for search--------------------

btnFind.addEventListener("click",() => loadRecipes(textSearch.value));

// -------------------for enabling the search option for any kind of dish----------------------
textSearch.addEventListener("keyup",(e) => {
    const inputVal=textSearch.value;
    if(e.keyCode===13){
            loadRecipes(inputVal);
        }
});

// ---------for enabling the loading gif after any search---------
const toggleLoad = (element, isShow) => {
    element.classList.toggle("hide", isShow);
};



function loadRecipes(type = "paneer") {
    toggleLoad(loadingEle, false);
  const url = baseurl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        renderRecipies(data.hits);
        toggleLoad(loadingEle, true);
    })
    .catch((error) => toggleLoad(loadingEle, true))
}
loadRecipes();

// -------------------for displaying the steps properly----------------------
const getRecipeStepsStr= (ingredientLines = []) => {
    let str="";
    for(var step of ingredientLines){
        str=str+`<li>${step}</li>`;
    }
    return str;
};

const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML="";
  recipeList.forEach((recipeObj) => {
    const {
        label:recipeTitle,
        ingredientLines, 
        image:recipeImage
    }=recipeObj.recipe;
    const recipeStepStr=getRecipeStepsStr(ingredientLines);
    const htmlStr = `<div class="recipe">
            <div class="recipe-title">${recipeTitle}</div>
            <div class="recipe-imge">
                <img src="${recipeImage}" height="160px" width="160px"  alt="Recipe"/>
            </div>
            <div class="recipe-text">
                <ul>
                    ${recipeStepStr}
                </ul>
            </div>
        </div>`;
    recipeContainer.insertAdjacentHTML("beforeend",htmlStr);
  });
};


