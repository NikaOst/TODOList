const addNewTaskBtn = document.querySelector('#addNewTaskBtn');
const modalWindow = document.querySelector('.modalWindow');
const addTaskForm = document.querySelector('#addTaskForm');
const tasksList = document.querySelector('.tasksList');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', (event) => {
  event.preventDefault();
  tasks.forEach((task) => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<input type="checkbox"/><div><span>${task.date}</span><span>${task.title}</span></div>`;
    tasksList.append(taskContainer);
  });
  const today = new Date();
  const dateStr = today.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const dayName = today.toLocaleDateString('ru-RU', { weekday: 'long' });

  const dayOfWeekSpan = document.querySelector('#dayOfWeek');
  const todayDateSpan = document.querySelector('#date');
  todayDateSpan.textContent = dateStr;
  dayOfWeekSpan.textContent = dayName[0].toUpperCase() + dayName.slice(1);
});

addNewTaskBtn.addEventListener('click', (event) => {
  event.preventDefault();
  modalWindow.hidden = false;
});

addTaskForm.addEventListener('reset', (event) => {
  event.preventDefault();
  event.stopPropagation();
  modalWindow.hidden = true;
});

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  const task = {
    title: event.target.elements['description'].value,
    date: event.target.elements['date'].value,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');
  taskContainer.innerHTML = `<input type="checkbox"/><div><span>${task.date}</span><span>${task.title}</span></div>`;
  tasksList.append(taskContainer);
  event.target.elements['description'].value = '';
  event.target.elements['date'].value = '';
  modalWindow.hidden = true;
});
