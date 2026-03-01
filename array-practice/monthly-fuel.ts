type Fuel = {
  date: string;
  amount: number;
};

const data: Fuel[] = [
  { date: "2026-02-01", amount: 500 },
  { date: "2026-02-05", amount: 700 },
  { date: "2026-03-01", amount: 600 },
];

const febTotal = data
  .filter((d) => d.date.startsWith("2026-02"))
  .reduce((sum, d) => sum + d.amount, 0);

const highest = data.reduce((max, d) => (d.amount > max.amount ? d : max));

const total = data.reduce((sum, d) => sum + d.amount, 0);
const avg = total / data.length;

console.log({ febTotal, highest, avg });
