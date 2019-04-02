const todos = [
  { id: 1, text: 'Take out trash and recycling', complete: true },
  { id: 2, text: 'Pick up dry cleaning', complete: false },
  { id: 3, text: 'Get oil change', complete: false },
  { id: 4, text: 'Write thank-you notes', complete: false },
];

const mainTodoList = document.getElementById('main-todo-list');
const remainingCount = document.getElementById('remaining-count');
const todoInput = document.getElementById('todo-input');
const toggleVisibilityButton = document.getElementById('toggle-visibility-button');

const getRemainingCount = () => todos.reduce((acc, todo) => (!todo.complete ? acc + 1 : acc), 0);

const newTodoDiv = ({ id, text, complete }) => {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo';
  todoDiv.dataset.id = id;

  const todoItem = document.createElement('span');
  todoItem.className = 'todo-text';
  todoItem.innerText = text;

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.className = 'todo-checkbox';
  todoCheckbox.checked = complete;

  todoDiv.appendChild(todoCheckbox);
  todoDiv.appendChild(todoItem);

  todoDiv.classList.toggle('complete', todoCheckbox.checked);

  return todoDiv;
};

let nextId = todos[todos.length - 1].id + 1;
let hideCompletedTodos = false;


remainingCount.innerText = getRemainingCount();

todos.forEach((todo) => {
  const todoDiv = newTodoDiv(todo);
  mainTodoList.appendChild(todoDiv);
});

mainTodoList.addEventListener('click', (e) => {
  const checkbox = e.target.querySelector('input')
    ? e.target.querySelector('input')
    : e.target.parentElement.querySelector('input');
  const todoDiv = checkbox.parentElement;

  checkbox.checked = e.target !== checkbox ? !checkbox.checked : checkbox.checked;
  todoDiv.style.display = hideCompletedTodos ? 'none' : 'block';
  todoDiv.classList.toggle('complete', checkbox.checked);

  todos.forEach((todo) => {
    todo.complete = todo.id === parseInt(todoDiv.dataset.id, 10) ? !todo.complete : todo.complete;
  });
  remainingCount.innerText = getRemainingCount();
});

todoInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const todo = { id: nextId, text: e.target.value, complete: false };
    todos.push(todo);
    nextId++;

    const newTodo = newTodoDiv(todo);
    mainTodoList.appendChild(newTodo);

    remainingCount.innerText = getRemainingCount();

    todoInput.value = '';
  }
});

toggleVisibilityButton.addEventListener('click', () => {
  const todoItems = document.querySelectorAll('.todo');

  hideCompletedTodos = !hideCompletedTodos;

  if (hideCompletedTodos) {
    todoItems.forEach((todo) => {
      const checkbox = todo.querySelector('input');

      todo.style.display = checkbox.checked ? 'none' : 'block';

      toggleVisibilityButton.innerText = 'Show completed items';
    });
  } else {
    todoItems.forEach((todo) => {
      todo.style.display = 'block';

      toggleVisibilityButton.innerText = 'Hide completed items';
    });
  }
});
