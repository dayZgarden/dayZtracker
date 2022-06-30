const calorie = localStorage.getItem('calorie');
const goal = document.querySelector('.tracking__goal');
goal.innerHTML = `Your calorie goal: ${calorie}`;
const breakfastHTML = document.querySelector('.breakfast')
const lunchHTML = document.querySelector('.lunch')
const dinnerHTML = document.querySelector('.dinner')
const snackHTML = document.querySelector('.snack')
const calHTML = document.querySelector('.tc');

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
    content = `${content}`;
    if(meal === 'Breakfast'){
        choice = 1;
    }
    else if(meal === 'Lunch'){
        choice = 2;
    }
    else if(meal === 'Dinner'){
        choice = 3;
    }
    else{
        choice = 4;
    }
    main(content,choice);
}

function main(content, choice) {
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
    foodData = Object.values(data);
    foodData1 = foodData[0];
    console.log(foodData1[0]);
    name = foodData1[0].food_name
    calories = foodData1[0].nf_calories
    protein = foodData1[0].nf_protein
    fat = foodData1[0].nf_total_fat
    carbs = foodData1[0].nf_total_carbohydrate
    
    content = `<li class="nFood">Food: ${name}</li>
    <li class="food__calorie">Total Calories: ${calories}</li>
    <li class="macro protein">P: ${protein} grams</li>
    <li class="macro fat">F: ${fat} grams</li>
    <li class="macro carb">C: ${carbs} grams</li>`
    
    // foodData2 = Object.entries(foodData1[0]);
    // console.log(foodData2);
    // foodData3 = Object.keys(foodData1[0]);
    // console.log(foodData3)
    totalCalories(calories);
    if(choice === 1){
        breakfastHTML.innerHTML = content;
        // foodsHTML.innerHTML = foodData2.map(post => mealsHTML(post)).join('');
    }
    else if(choice === 2){
        lunchHTML.innerHTML = content;
    }
    else if(choice === 3){
        dinnerHTML.innerHTML = content;
    }
    else{
        snackHTML.innerHTML = content;
    }
})

}

function totalCalories(calories){
    let cal = parseFloat(calories);
    let total = 0;
    total = cal + total;
    calHTML.innerHTML = `Total Calories: ${total}`
}

// function mealsHTML(post) {
//     return `
//     <li class="nFood">Food: ${post.food_name}</li>
//     <li class="food__calorie">Total Calories: ${post.nf_calories}</li>
//     <li class="macro protein">P: ${post.nf_protein} grams</li>
//     <li class="macro fat">F: ${post.nf_total_fat} grams</li>
//     <li class="macro carb">C: ${post.nf_total_carbohydrate} grams</li>
//     `
// }
