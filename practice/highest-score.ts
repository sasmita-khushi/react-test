let arr = [10, 50, 30, 80, 90, 60];

function highestScore(arr: number[]) {
  return arr.sort((a, b) => b - a).slice(0, 3);
}

console.log(highestScore(arr));
