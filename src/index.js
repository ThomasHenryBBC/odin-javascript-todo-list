import './styles/reset.css';
import './styles/styles.css';
import createTodo from './services/create-todo.js';
import createProject from './services/create-project.js';
import {
  renderTodoCreator,
  clearPageContainer,
  renderTodoList,
  renderProjectList,
  renderProjectCreator,
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

const viewTodoListButton = document.getElementById('todo-list');
viewTodoListButton.addEventListener('click', () => {
  renderTodoList(todoList, projectList);
});

const viewProjectsButton = document.getElementById('projects');
viewProjectsButton.addEventListener('click', () => {
  renderProjectList(projectList);
  renderProjectCreator((projectData) => {
    const project = new createProject(
      projectData.name,
      projectData.description,
    );
    projectList.push(project);
    console.log('Project List:', projectList);
    renderProjectList(projectList);
  });
});

// Initial render of the todo list
renderTodoList(todoList, projectList);
