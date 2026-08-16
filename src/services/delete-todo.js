import { projectList, saveData } from '../data.js';

export default function deleteTodo(todo, todoList, onDelete) {
  const index = todoList.indexOf(todo);
  if (index > -1) {
    todoList.splice(index, 1);
    saveData(todoList, projectList);
    onDelete();
  }
}
