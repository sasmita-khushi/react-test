function findMissing(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i) {
      return i;
    }
  }
  return arr.length;
}

console.log(findMissing([0, 1, 2, 4, 5]));
