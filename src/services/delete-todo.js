export default function deleteTodo(todo, todoList, onDelete) {
  const index = todoList.indexOf(todo);
  if (index > -1) {
    todoList.splice(index, 1);
    onDelete();
  }
}
