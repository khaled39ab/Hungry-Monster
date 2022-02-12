//Searching Meal
const getSearchMeal = () => {
    const meal = document.getElementById("searchMeal").value;
    if (meal){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchMeal(data.meals))
        .catch(error => errorMessage("No meal found. Try with different name.."));
    } else {
        document.getElementById("errorMessage").innerText = "You have not entered anything";
    }
}

//Displaying Meals
const displaySearchMeal = meals => {
    const mealItems = document.getElementById("mealItems");
    mealItems.innerHTML = "";
    document.getElementById("errorMessage").innerText = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
        const displayMeal = `
        <a href="#meal-details-section" style="text-decoration: none; color: black;">
            <div class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
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
    fetch (url)
    .then (res => res.json())
    .then (data => console.log(data))

}

//Error handler
const errorMessage = (error) => {
    const errorMe = document.getElementById("errorMessage");
    errorMe.innerText = error;
    document.getElementById("mealItems").innerHTML = "";
}