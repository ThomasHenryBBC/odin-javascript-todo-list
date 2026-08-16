const defaultTodoList = [
  {
    title: 'Plan weekly meals',
    description: 'Choose recipes and make a grocery list for the week.',
    dueDate: '2026-08-18',
    priority: 'Medium',
    project: 'Personal',
  },
  {
    title: 'Review project requirements',
    description:
      'Check the current todo list requirements before starting the next feature.',
    dueDate: '2026-08-20',
    priority: 'High',
    project: 'Work',
  },
  {
    title: 'Read a chapter',
    description: 'Read one chapter of the book before the weekend.',
    dueDate: '2026-08-22',
    priority: 'Low',
    project: 'Personal',
  },
];

const defaultProjectList = [
  {
    name: 'General',
    description: 'General tasks and reminders.',
  },
  {
    name: 'Work',
    description: 'Tasks related to work and professional development.',
  },
  {
    name: 'Personal',
    description: 'Personal tasks and hobbies.',
  },
];

const storedData = JSON.parse(localStorage.getItem('todoListData'));

export const todoList = storedData?.todoList ?? defaultTodoList;
export const projectList = storedData?.projectList ?? defaultProjectList;

export function saveData(todoList, projectList) {
  localStorage.setItem(
    'todoListData',
    JSON.stringify({ todoList, projectList }),
  );
}
