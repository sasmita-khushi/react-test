const orders = [
  { id: 1, date: "2026-02-01", total: 500 },
  { id: 2, date: "2026-02-01", total: 200 },
  { id: 3, date: "2026-02-02", total: 900 },
];

function groupByDate(orders: { id: number; date: string; total: number }[]) {
  return orders.reduce(
    (acc, order) => {
      if (!acc[order.date]) {
        acc[order.date] = [];
      }
      acc[order.date].push(order);
      return acc;
    },
    {} as Record<string, { id: number; date: string; total: number }[]>,
  );
}

console.log(groupByDate(orders));

function groupByDate2(orders: { id: number; date: string; total: number }[]) {
  const grouped: Record<string, { id: number; date: string; total: number }[]> =
    {};

  for (let order of orders) {
    if (!grouped[order.date]) {
      grouped[order.date] = [];
    }
    grouped[order.date].push(order);
  }

  return grouped;
}

console.log(groupByDate2(orders));
