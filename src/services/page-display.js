import { projectList, todoList, saveData } from '../data.js';
import createProject from './create-project.js';
import deleteTodo from './delete-todo.js';

export function renderTodoCreator(onSubmit) {
  clearPageContainer();

  const pageContainer = document.getElementById('page-container');
  const todoForm = document.createElement('form');
  todoForm.id = 'todo-form';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const titleInputLabel = document.createElement('label');
  titleInputLabel.for = 'title';
  titleInputLabel.textContent = 'Title:';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Description';

  const descriptionInputLabel = document.createElement('label');
  descriptionInputLabel.for = 'description';
  descriptionInputLabel.textContent = 'Description:';

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';

  const dueDateInputLabel = document.createElement('label');
  dueDateInputLabel.for = 'due-date';
  dueDateInputLabel.textContent = 'Due Date:';

  const prioritySelect = document.createElement('select');
  const priorities = ['Low', 'Medium', 'High'];
  priorities.forEach((priority) => {
    const option = document.createElement('option');
    option.value = priority;
    option.textContent = priority;
    prioritySelect.append(option);
  });

  const prioritySelectLabel = document.createElement('label');
  prioritySelectLabel.for = 'priority';
  prioritySelectLabel.textContent = 'Priority:';

  const projectSelect = document.createElement('select');
  projectList.forEach((project) => {
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.append(option);
  });

  const projectSelectLabel = document.createElement('label');
  projectSelectLabel.for = 'project';
  projectSelectLabel.textContent = 'Project:';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Todo';

  function handleFormSubmit(event) {
    event.preventDefault();
    const todoData = {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      priority: prioritySelect.value,
      project: projectSelect.value,
    };
    onSubmit(todoData);
  }

  todoForm.addEventListener('submit', handleFormSubmit);

  todoForm.append(
    titleInputLabel,
    titleInput,
    descriptionInputLabel,
    descriptionInput,
    dueDateInputLabel,
    dueDateInput,
    prioritySelectLabel,
    prioritySelect,
    projectSelectLabel,
    projectSelect,
    submitButton,
  );
  pageContainer.append(todoForm);
}

export function clearPageContainer() {
  const pageContainer = document.getElementById('page-container');
  pageContainer.innerHTML = '';
}

export function renderTodoList(todoList, projectList) {
  clearPageContainer();

  const pageContainer = document.getElementById('page-container');
  const todoListContainer = document.createElement('div');
  todoListContainer.id = 'todo-list';

  for (const project of projectList) {
    const projectHeader = document.createElement('h2');
    projectHeader.textContent = project.name;
    todoListContainer.append(projectHeader);

    const projectTodos = todoList.filter(
      (todo) => todo.project === project.name,
    );
    if (projectTodos.length === 0) {
      const noTodosMessage = document.createElement('p');
      noTodosMessage.textContent = 'No todos for this project.';
      todoListContainer.append(noTodosMessage);
    } else {
      projectTodos.forEach((todo) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        const title = document.createElement('h3');
        title.textContent = todo.title;

        const description = document.createElement('p');
        description.textContent = todo.description;

        const dueDate = document.createElement('p');
        dueDate.textContent = `Due Date: ${todo.dueDate}`;

        const priority = document.createElement('p');
        priority.textContent = `Priority: ${todo.priority}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteTodo(todo, todoList, () => {
            renderTodoList(todoList, projectList);
          });
        });

        todoItem.append(title, description, dueDate, priority, deleteButton);
        todoListContainer.append(todoItem);
      });
    }
  }

  pageContainer.append(todoListContainer);
}

export function renderProjectList(projectList) {
  clearPageContainer();

  const pageContainer = document.getElementById('page-container');
  const projectListContainer = document.createElement('div');
  projectListContainer.id = 'project-list';

  const header = document.createElement('h2');
  header.textContent = 'Projects';
  projectListContainer.append(header);

  if (projectList.length === 0) {
    const noProjectsMessage = document.createElement('p');
    noProjectsMessage.textContent = 'No projects available.';
    projectListContainer.append(noProjectsMessage);
  }

  projectList.forEach((project) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';

    const name = document.createElement('h3');
    name.textContent = project.name;

    const description = document.createElement('p');
    description.textContent = project.description;

    projectItem.append(name, description);
    projectListContainer.append(projectItem);
  });

  pageContainer.append(projectListContainer);
}

export function renderProjectCreator(onSubmit) {
  const pageContainer = document.getElementById('page-container');
  const projectForm = document.createElement('form');
  projectForm.id = 'project-form';

  const header = document.createElement('h2');
  header.textContent = 'Create New Project';
  projectForm.append(header);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Project Name';
  nameInput.required = true;

  const nameInputLabel = document.createElement('label');
  nameInputLabel.for = 'name';
  nameInputLabel.textContent = 'Project Name:';

  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Project Description';

  const descriptionInputLabel = document.createElement('label');
  descriptionInputLabel.for = 'description';
  descriptionInputLabel.textContent = 'Project Description:';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Project';

  function handleFormSubmit(event) {
    event.preventDefault();
    const projectData = {
      name: nameInput.value,
      description: descriptionInput.value,
    };
    onSubmit(projectData);
  }

  projectForm.addEventListener('submit', handleFormSubmit);

  projectForm.append(
    nameInputLabel,
    nameInput,
    descriptionInputLabel,
    descriptionInput,
    submitButton,
  );
  pageContainer.append(projectForm);
}

export function renderProjectsPage() {
  clearPageContainer();

  renderProjectList(projectList);

  renderProjectCreator((projectData) => {
    const project = new createProject(
      projectData.name,
      projectData.description,
    );

    projectList.push(project);
    saveData(todoList, projectList);

    renderProjectsPage();
  });
}
