let students = [
  { name: "A", marks: 80 },
  { name: "B", marks: 92 },
  { name: "C", marks: 85 },
];

function findTopper(students: { name: string; marks: number }[]) {
  return students.reduce((topper, student) =>
    student.marks > topper.marks ? student : topper,
  );
}

console.log(findTopper(students));

const sortedAsc = [...students].sort((a, b) => a.marks - b.marks);
console.log(sortedAsc);

function findTopper2(students: { name: string; marks: number }[]) {
  let topper = students[0];

  for (let i = 1; i < students.length; i++) {
    if (students[i].marks > topper.marks) {
      topper = students[i];
    }
  }

  return topper;
}

console.log(findTopper2(students));
