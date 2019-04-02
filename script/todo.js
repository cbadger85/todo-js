const todos = [
  { id: 1, text: 'Take out trash and recycling', complete: true },
  { id: 2, text: 'Pick up dry cleaning', complete: false },
  { id: 3, text: 'Get oil change', complete: false },
  { id: 4, text: 'Write thank-you notes', complete: false },
];

let nextId = 5;

const mainTodoList = document.getElementById('main-todo-list');
const remainingCount = document.getElementById('remaining-count');
const todoInput = document.getElementById('todo-input');

remainingCount.innerText = todos.reduce((acc, todo) => (!todo.complete ? acc += 1 : acc), 0);

const newTodoDiv = (todo) => {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo';

  const todoItem = document.createElement('span');
  todoItem.className = 'todo-text';
  todoItem.innerText = todo.text;

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.className = 'todo-checkbox';
  todoCheckbox.checked = todo.complete;

  todoDiv.appendChild(todoCheckbox);
  todoDiv.appendChild(todoItem);

  todoDiv.classList.toggle('complete', todoCheckbox.checked);

  return todoDiv;
};

todos.forEach((todo) => {
  const todoDiv = newTodoDiv(todo);
  mainTodoList.appendChild(todoDiv);

  const checkbox = todoDiv.querySelector('.todo-checkbox');

  checkbox.addEventListener('click', () => {
    todoDiv.classList.toggle('complete', checkbox.checked);
    todo.complete = !todo.complete;

    remainingCount.innerText = todos.reduce((acc, todo) => (!todo.complete ? acc += 1 : acc), 0);
  });
});

todoInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    todos.push({ id: nextId, text: e.target.value, complete: false });
    nextId++;
  }
});
