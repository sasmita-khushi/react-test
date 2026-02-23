let arr = [
  { name: "Driver1", distance: 5 },
  { name: "Driver2", distance: 2 },
  { name: "Driver3", distance: 8 },
];

function findNearestDriver(arr: { name: string; distance: number }[]) {
  if (arr.length === 0) return null;
  return arr.reduce((minimum, item) => {
    return minimum.distance < item.distance ? minimum : item;
  });
}

console.log(findNearestDriver(arr));
