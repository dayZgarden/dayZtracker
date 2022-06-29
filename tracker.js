const calorie = localStorage.getItem('calorie');
const goal = document.querySelector('.tracking__goal');
goal.innerHTML = `Your calorie goal: ${calorie}`;
const foodsHTML = document.querySelector('.meal__period--contents')

let isModalOpen = false;
function toggleMeals(){
    if(isModalOpen){
        isModalOpen = false;
        return document.body.classList.remove('modal--open');
    }
    isModalOpen = true;
    document.body.classList += ' modal--open';
}

function mealTracker(){
    event.preventDefault();
    let meal = document.getElementById('meal').value;
    let food = document.getElementById('food').value;
    let serving = document.getElementById('serving').value;
    let quantity = document.getElementById('quantity').value;
    let content = `${meal} ${quantity} ${serving} of ${food}`;
    main(content);
}

function main(content) {
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    
    let query = {
    "query": `${content}`,
    "timezone": "US/Eastern"
    }
    
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'cedc0df4',
        'x-app-key': '8cd70410a5057316ad553969de10884a',
        'x-remote-user-id': '0'
    },
    body: JSON.stringify(query)
})
  .then(response => response.json())
  .then(data => {
    foodData[0] = Object.values(data);
    console.log(foodData[0]);
})

}

function mealsHTML(post) {
    return `
    <li class="nFood">Food: ${post}</li>
    <li class="food__calorie">Total Calories: ${post.nf_calories}</li>
    <li class="macro protein">P: ${post.nf_protein} grams</li>
    <li class="macro fat">F: ${post.nf_total_fat} grams</li>
    <li class="macro carb">C: ${post.nf_total_carbohydrate} grams</li>
    `
}
