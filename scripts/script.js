const addNewTaskBtn = document.querySelector('#addNewTaskBtn');
const modalWindow = document.querySelector('.modalWindow');
const addTaskForm = document.querySelector('#addTaskForm');
const tasksList = document.querySelector('.tasksList');
const blurbackground = document.querySelector('.blurbackground');
const searchInput = document.querySelector('#searchInput');
const filterData = document.querySelector('#filterData');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// функция рендера
function renderTasks(task) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');
  let checkboxState = '';
  if (task.completed === true) {
    taskContainer.classList.add('compleatedTask');
    checkboxState = 'checked';
  }
  taskContainer.innerHTML = `<input id="${task.id}" ${checkboxState} type="checkbox"/><div><span>${task.date}</span><span>${task.title}</span></div>`;
  taskContainer.setAttribute('name', task.id);
  tasksList.append(taskContainer);
}

// Сюда добавить условие, если стутус таски тру, то задать ей определнные стили
window.addEventListener('load', (event) => {
  event.preventDefault();
  tasks.forEach((task) => {
    renderTasks(task);
  });
  const today = new Date();
  const dateStr = today.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const dayName = today.toLocaleDateString('ru-RU', { weekday: 'long' });
  const dayOfWeekSpan = document.querySelector('#dayOfWeek');
  const todayDateSpan = document.querySelector('#date');
  todayDateSpan.textContent = dateStr;
  dayOfWeekSpan.textContent = dayName[0].toUpperCase() + dayName.slice(1);
});

// Открыть выпадающее окно с созданием тасков
addNewTaskBtn.addEventListener('click', (event) => {
  event.preventDefault();
  modalWindow.hidden = false;
  blurbackground.hidden = false;
});

// Очистить форму (кнопка отмена)
addTaskForm.addEventListener('reset', (event) => {
  event.stopPropagation();
  modalWindow.hidden = true;
  blurbackground.hidden = true;
});

// Создать таску
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();

  const dateStr = new Date(event.target.elements['date'].value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  const time = event.target.elements['date'].value.split('T')[1];

  const task = {
    id: Math.floor(Math.random() * 1000000000),
    title: event.target.elements['description'].value,
    date: `${dateStr}, ${time}`,
    completed: false,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks(task);

  addTaskForm.reset();
  modalWindow.hidden = true;
  blurbackground.hidden = true;
});

//При нажатии на чекбокс давать таске статус тру
tasksList.addEventListener('change', (event) => {
  const curentTask = document.getElementsByName(event.target.id);
  if (event.target.type === 'checkbox') {
    curentTask[0].classList.toggle('compleatedTask');
    for (let i = 0; i < tasks.length; i++) {
      if (String(tasks[i].id) === String(event.target.id)) {
        if (event.target.checked) {
          tasks[i].completed = true;
        } else tasks[i].completed = false;
      }
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Фильтрация
filterData.addEventListener('change', () => {
  const value = document.querySelector('input[type="radio"]:checked').value;
  document.querySelectorAll('.task').forEach((task) => task.remove());
  switch (value) {
    case 'all':
      tasks.forEach((task) => {
        renderTasks(task);
      });
      break;
    case 'active':
      tasks.forEach((task) => {
        if (task.completed === false) renderTasks(task);
      });
      break;
    case 'completed':
      tasks.forEach((task) => {
        if (task.completed === true) renderTasks(task);
      });
      break;
  }
});

// Поиск по дате или названию
searchInput.addEventListener('input', (event) => {
  const filteredTasksBySearch = tasks.filter((task) => {
    if (task.title.includes(event.target.value) || task.date.includes(event.target.value))
      return task;
  });
  document.querySelectorAll('.task').forEach((task) => task.remove());
  filteredTasksBySearch.forEach((task) => {
    renderTasks(task);
  });
});
