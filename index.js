
let form = document.getElementById('form')
form.addEventListener('submit', getCalories(event)); 

function getCalories(event){
  event.preventDefault();
  let calorie = document.getElementById('calorie').value;
  toTracker(calorie);
}

function toTracker(calorie){
    localStorage.setItem('calorie', calorie);
    window.location.href = `${window.location.origin}/tracker.html`
}
