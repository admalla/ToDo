let inp = document.getElementById('inp');
let addBtn = document.getElementById('addBtn');
let tasks = document.getElementById('tasks');
let countNew = document.querySelector('._new');
let countAccepted = document.querySelector('._accepted');

let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

let displayTasks = () => {
  tasks.innerHTML = '';
  tasksArray.forEach((element, i) => {
    tasks.innerHTML += `
    <div class="box ${element.completed && 'completed'}">
            <span class="text">${element.text}</span>
            <div>
              <input id='${i}' type="checkbox" ${element.completed && 'checked'}/>
              <i id='${i}' class="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
    `;
  });
  count();
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

displayTasks();

addBtn.addEventListener('click', () => {
  console.log(1);
  if (inp.value != '') {
    tasksArray.push({ text: inp.value, completed: false });
    inp.value = '';
    displayTasks();
  }
});

tasks.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    tasksArray[e.target.id].completed = !tasksArray[e.target.id].completed;
  } else if (e.target.className === 'fa fa-times') {
    tasksArray.splice(e.target.id, 1);
  }
  displayTasks();
});

function count() {
  countAccepted.innerHTML = 0;
  countNew.innerHTML = 0;
  tasksArray.forEach((e) => {
    if (e.completed) {
      countAccepted.innerHTML++;
    } else {
      countNew.innerHTML++;
    }
  });
}
