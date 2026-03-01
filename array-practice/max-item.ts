let orders = [
  { name: "Pen", price: 30 },
  { name: "Pencil", price: 10 },
  { name: "Erasor", price: 50 },
  { name: "Highlighter", price: 5 },
];

type orderType = {
  name: string;
  price: number;
};

function max(order: orderType[]) {
  return order.reduce((max, item) => {
    return max.price > item.price ? max : item;
  });
}

console.log(max(orders));

// function maxItem(order: orderType[]) {
//   let max = order[0];
//   for (const item of order) {
//     if (max.price < item.price) {
//       max = item;
//     }
//   }
//   return max;
// }

// console.log(maxItem(orders));
