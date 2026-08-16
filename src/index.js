import './styles/reset.css';
import './styles/styles.css';
import createTodo from './services/create-todo.js';
import {
  renderTodoCreator,
  clearPageContainer,
  renderTodoList,
  renderProjectList,
} from './services/page-display.js';
import { todoList, projectList } from './data.js';

const createTodoButton = document.getElementById('create-todo');
createTodoButton.addEventListener('click', () => {
  renderTodoCreator((todoData) => {
    const todo = new createTodo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.project,
    );
    todoList.push(todo);
    console.log('Todo List:', todoList);
    renderTodoList(todoList, projectList);
  });
});

renderTodoList(todoList, projectList);
