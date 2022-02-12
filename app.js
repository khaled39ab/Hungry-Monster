//Searching Meal
const getSearchMeal = () => {
    const meal = document.getElementById("searchMeal").value;
    if (meal) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchMeal(data.meals))
            .catch(error => errorMessage("No meal found. Try with different name.."));
    } else {
        document.getElementById("errorMessage").innerText = "You have not entered anything";
        document.getElementById("mealItems").innerText = "";
        document.getElementById("mealDetails").innerText = "";
    }
}

//Displaying Meals
const displaySearchMeal = meals => {
    const mealItems = document.getElementById("mealItems");
    mealItems.innerHTML = "";
    document.getElementById("errorMessage").innerText = "";
    document.getElementById("mealDetails").innerText = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
        const displayMeal = `
        <a href="#meal-details-section" style="text-decoration: none; color: black;">
            <div onclick="displayMealInfo(${meal.idMeal})" class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
                <img src="${meal.strMealThumb}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${meal.strMeal}</h5>
                </div>
            </div>
        </a>
        `
        mealDiv.innerHTML = displayMeal;
        mealItems.appendChild(mealDiv);
    });
}

// Search button event handler
document.getElementById("searchBtn").addEventListener("click", getSearchMeal);

//Meal Details
const displayMealInfo = (mealId) => {
    const mealDetails = document.getElementById("mealDetails");
    mealDetails.innerHTML = "";
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetailsDiv(data))

}

//Display Meal Info
const showMealDetailsDiv = data => {
    const meal = data.meals[0];
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;

    // Set Meal Details Div Structure
    const mealDetailsSection = document.getElementById('mealDetails');
    mealDetailsSection.innerHTML = `
        <div id="meal-details" class="card px-0 pb-1 border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px;">
            <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
            <div class="card-body">
                <h2 class="card-title text-center my-3">${mealName}</h2>
                <hr>
                <h5 class="card-title mt-4">Meal Ingredients</h5>
                <div id="meal-ingredients"></div>
            </div>
        </div>
    `
    const mealIngredients = document.getElementById('meal-ingredients');

    // Set Contents of Each Paragraph Inside Meal Details Div Structure
    for(let i = 1; meal[`strIngredient${i}`]; i++){
        const ingredients = `
        ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        `
        const mealDetailsP = document.createElement('p');
        mealDetailsP.className = 'card-text';
        mealDetailsP.innerText = ingredients;
        mealIngredients.appendChild(mealDetailsP);
    }
}

//Error handler
const errorMessage = (error) => {
    const errorMe = document.getElementById("errorMessage");
    errorMe.innerText = error;
    document.getElementById("mealItems").innerHTML = "";
}