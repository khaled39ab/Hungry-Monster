const getSearchMeal = () => {
    const meal = document.getElementById("searchMeal").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchMeal(data.meals))
        .catch(error => errorMessage("No match found. Try in different word"));
}

const displaySearchMeal = meals => {
    const mealItems = document.getElementById("mealItems");
    mealItems.innerHTML = "";
    document.getElementById("errorMessage").innerText = "";

    if (mealItems) {
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
    } else {
        document.getElementById("mealItems").innerHTML = "You have not entered anything";
        // document.getElementById("mealItems").innerHTML = "";
    }
}
document.getElementById("searchBtn").addEventListener("click", () => {
    getSearchMeal();
});

const displayMeal = () => {
    const mealDetails = document.getElementById("mealDetails");
}

const errorMessage = (error) => {
    const errorMe = document.getElementById("errorMessage");
    errorMe.innerText = error;
    document.getElementById("mealItems").innerHTML = "";
}