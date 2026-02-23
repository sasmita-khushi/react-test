let arr = [
  { type: "credit", amount: 2000 },
  { type: "debit", amount: 500 },
  { type: "debit", amount: 700 },
];

type arrType = {
  type: string;
  amount: number;
};

function transactionHistory(arr: arrType[]) {
  let totalCredit = 0;
  let totalDebit = 0;

  for (let transaction of arr) {
    if (transaction.type === "credit") {
      totalCredit += transaction.amount;
    } else if (transaction.type === "debit") {
      totalDebit += transaction.amount;
    }
  }
  const balance = totalCredit - totalDebit;
  return {
    totalCredit,
    totalDebit,
    balance,
  };
}

console.log(transactionHistory(arr));
