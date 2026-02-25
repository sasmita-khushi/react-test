const arr = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
];

type arrType = {
  id: number;
  name: string;
};

function Map(arr: arrType[]) {
  const map: { [key: number]: arrType } = {};
  for (const item of arr) {
    map[item.id] = item;
  }
  return map;
}

console.log(Map(arr));
