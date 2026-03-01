const todos = [
  { title: "Learn JavaScript", done: true },
  { title: "Practice DSA", done: true },
  { title: "Build React App", done: true },
  { title: "Apply for Jobs", done: false },
];

type todoType = {
  title: string;
  done: boolean;
};
function getCompletionPercentage(todos: todoType[]) {
  const completed = todos.reduce((count, todo) => {
    return todo.done ? count + 1 : count;
  }, 0);

  return (completed / todos.length) * 100;
}

console.log(getCompletionPercentage(todos)); // 50
