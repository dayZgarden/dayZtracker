
let form = document.getElementById('form')
form.addEventListener('submit', getCalories(event)); 

function getCalories(event){
  event.preventDefault();
  let calorie = document.getElementById('calorie').value;
  toTracker(calorie);
}

function toTracker(calorie){
    localStorage.setItem('calorie', calorie);
    window.location.href = `http://127.0.0.1:5500/tracker.html`
}
