const orders = [
  { user: "A", amount: 500 },
  { user: "B", amount: 1500 },
  { user: "A", amount: 700 },
  { user: "C", amount: 2000 },
];

function Shopping(order: { user: string; amount: number }[]) {
  return order.reduce((total, item) => total + item.amount, 0);
}

console.log(Shopping(orders));

// function totalSpending(order: { user: string; amount: number }[]) {
//   let total = 0;

//   for (let item of order) {
//     if (item.user === "A") {
//       total += item.amount;
//     }
//   }

//   return total;
// }

function totalSpending(order: { user: string; amount: number }[]) {
  return order.reduce((total, item) => {
    return item.user === "A" ? total + item.amount : total;
  }, 0);
}
console.log(totalSpending(orders));

function sort(order: { user: string; amount: number }[]) {
  const sortedOrders = [...order].sort((a, b) => a.amount - b.amount);
  console.log(sortedOrders);
}
console.log(sort(orders));
