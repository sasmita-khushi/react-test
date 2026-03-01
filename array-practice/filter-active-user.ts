const users = [
  { name: "A", active: true },
  { name: "B", active: false },
  { name: "C", active: true },
];

const activeUsers = users.filter((user) => user.active);

console.log(activeUsers);
