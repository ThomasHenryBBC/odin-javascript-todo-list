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
    submitButton,
  );
  pageContainer.append(todoForm);
}

export function clearPageContainer() {
  const pageContainer = document.getElementById('page-container');
  pageContainer.innerHTML = '';
}

export function renderTodoList(todoList) {
  clearPageContainer();

  const pageContainer = document.getElementById('page-container');
  const todoListContainer = document.createElement('div');
  todoListContainer.id = 'todo-list';

  todoList.forEach((todo) => {
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

    todoItem.append(title, description, dueDate, priority);
    todoListContainer.append(todoItem);
  });

  pageContainer.append(todoListContainer);
}
