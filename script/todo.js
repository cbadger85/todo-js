const todos = [
  { id: 1, text: 'Take out trash and recycling', complete: true },
  { id: 2, text: 'Pick up dry cleaning', complete: false },
  { id: 3, text: 'Get oil change', complete: false },
  { id: 4, text: 'Write thank-you notes', complete: false },
];

const mainTodoList = document.getElementById('main-todo-list');

todos.forEach((todo) => {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo';

  const todoItem = document.createElement('span');
  todoItem.className = 'todo-text';
  todoItem.innerText = todo.text;

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.className = 'todo-checkbox';
  todoDiv.appendChild(todoCheckbox);
  todoDiv.appendChild(todoItem);
  mainTodoList.appendChild(todoDiv);
});
