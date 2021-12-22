/* -------------------- */
/*   1. JSON 객체 실습    */
/* -------------------- */

const sopt = {
  name: "WE SOPT",
  slogan: "우리가 SOPT입니다",
  part: ["plan", "design", "android", "iOS", "server", "web"],
  number: 180,
  printName: function () {
    console.log("name: ", this.name);
  },
  printNum: function () {
    console.log("number: ", this.number);
  },
};

console.log("typeof sopt: " + typeof sopt);

// +와 ,의 차이
// https://wrkbr.tistory.com/554
// +를 사용하면 toString() 메소드를 호출한 상태로 log 메소드에 인자로 전달됨.
// + object is equivalent to object.toString(). And toString on object returns "[object Object]".
console.log("sopt: " + sopt);
// ,를 사용하면 별도의 객체로 toString() 메소드를 호출하지 않고 log 메소드의 인자로 전달됨.
console.log("sopt: ", sopt);
console.log("sopt: " + JSON.stringify(sopt));

sopt.printName();
sopt.number = 190;
sopt.printNum();

/* -------------------- */
/*   2. JSON 배열 실습    */
/* -------------------- */
const foxes = [
  { name: "식빵", family: "붉은여우", age: 1, weight: 5.14 },
  { name: "콩콩", family: "북극여우", age: 3, weight: 6.5 },
  { name: "두팥", family: "은여우", age: 7, weight: 4.1 },
];


console.log(`foxes: ` + foxes);
console.log(`foxes: `, foxes);
console.log(`foxes: ` + JSON.stringify(foxes));

foxes.forEach((fox) =>
  console.log(
    fox.name +
      "이는 종이 " +
      fox.family +
      "이고, 나이가 " +
      fox.age +
      "세입니다~"
  )
);

foxes.forEach((fox) => 
    console.log(`${fox.name}이는 ${fox.weight} kg 입니다.`)
);
