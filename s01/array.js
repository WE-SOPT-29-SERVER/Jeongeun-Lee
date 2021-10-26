/* -------------------- */
/*   1. 배열 실습    */
/* -------------------- */

let arr1 = [];
console.log(arr1);
console.log(typeof arr1);

let arr2 = new Array(1, 2, 3, 4, 5);
console.log(arr2);
console.log(typeof arr2);

let arr3 = ["이정은", 1, 2, 3, null, { name: "jungeun", age: 23 }];
console.log(arr3);
console.log(typeof arr3);

/* -------------------------- */
/*   2. 배열 prototype 메서드    */
/* -------------------------- */

console.log("**** Array 기본 함수 알아보기 ****");
let arr = [1, 2, 3, 4];

// 2-1. length
console.log("\n       ~~~ 2-1. length ~~~");

console.log(`arr의 길이: ${arr.length}`);

// 2-2. push, pop
// 맨 뒤에 추가/삭제
console.log("\n       ~~~ 2-2. push, pop ~~~");

arr.push("new item");
console.log("arr push: ", arr);
arr.pop();
console.log("arr pop: ", arr);

// 2-3. shift, unshift
// 배열의 0번 인덱스에 추가/삭제
console.log("\n       ~~~ 2-3. shift, unshift ~~~");

arr.unshift("first item");
console.log("arr unshift: ", arr);
arr.shift();
console.log("arr shift: ", arr);

// 2-4. includes
// 해당 값이 포함되어 있는지 -> true, false
console.log("\n       ~~~ 2-4. includes ~~~");

console.log("arr.includes(4): ", arr.includes(4));
console.log("arr.includes(1000): ", arr.includes(1000));

// 2-5 indexOf
// 해당 값의 인덱스를 알려줌
// 없으면 -1 리턴
console.log("\n       ~~~ 2-5 indexOf ~~~");

console.log("arr.indexOf(4): ", arr.indexOf(4));
console.log("arr.indexOf(100): ", arr.indexOf(100));

// 2-6. concat
// 배열을 합쳐줌
console.log("\n       ~~~ 2-6. concat ~~~");
let arr11 = [10, 2, 3];
let arr22 = [4, 5, 6];
let concatArr = arr11.concat(arr22);
console.log("arr1.concat(arr2): ", concatArr);

// 2-7. join
// 배열 사이에 주어진 값 넣어서 string으로 리턴
console.log("\n       ~~~ 2-7. join ~~~");

let location = ["서울", "경기", "김해", "산본"];
console.log("join: ", location.join("-> "));
console.log(typeof location.join("-> "));

// 2-8. reverse
// 배열 반대 순서로 뒤집기
console.log("\n       ~~~ 2-8. reverse ~~~");
console.log(location.reverse().join("-> "));

// 2-9. sort
// 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// 배열 그 자체에서 정렬됨 (대입 안 해도 됨)
// 정렬은 문자열로 취급되어 정렬됨
console.log("\n       ~~~ 2-9. sort ~~~");

let countries = ["Österreich", "Andorra", "Vietnam"];
// Andorra, Vietnam, Österreich (제대로 정렬이 되지 않았습니다.)
console.log(countries.sort((a, b) => (a > b ? 1 : -1)));

// 문자열 정렬 (유니코드 기준)
console.log(
  countries.sort(function (a, b) {
    return a.localeCompare(b);
  })
);

// 문자열인 숫자는 string으로 바꿔준 다음에 한다.
console.log(
  concatArr.sort(function (a, b) {
    return a.toString().localeCompare(b);
  })
);

// 숫자 정렬
console.log(
  "오름차순 정렬:",
  concatArr.sort((a, b) => a - b)
);

console.log(
  "내림차순 정렬:",
  concatArr.sort(function (a, b) {
    return b - a;
  })
);

// 2-10 filter
// 배열 요소 전체를 대상으로 조건을 걸어서
//   그 조건을 충족하는 결과를 새로운 배열로 반환
console.log("\n       ~~~ 2-10 filter ~~~");
let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
let minusNumber = number.filter((item) => item < 0);
console.log("minusNumber: ", minusNumber);

// 2-11 map
// 배열 요소 전체를 대상으로 함수를 호출하고,
//   그 결과를 새로운 배열로 반환
console.log("\n       ~~~ 2-11 map ~~~");
let countries2 = ["Österreich", "Andorra", "Vietnam", "Korea", "China"];
let countriesLengths = countries2.map((item) => item.length);
console.log("contriesLengths: ", countriesLengths);

// 2-12 reduce
// map: 배열을 반환
// reduce: 값 하나를 반환
// 예: 1~n 까지의 합
console.log("\n       ~~~ 2-12 reduce ~~~");
let number2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = number2.reduce((previousValue, currentValue) => {
  console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
  return previousValue + currentValue;
});

console.log("sum = ", sum);

/* -------------------- */
/*     3. 배열 순회      */
/* -------------------- */

let alpha = ["a", "b", "c", "d", "e", "f", "g"];
let alphaIndexStr = "번호 ";
let alphaNameStr = "이름 ";

// size만큼 숫자
for (let item in alpha) {
  alphaIndexStr += item + "! ";
}
console.log(alphaIndexStr);

// 값을 가져옴
for (let item of alpha) {
  alphaNameStr += item + "! ";
}
console.log(alphaNameStr);

// 값을 가져옴
alpha.forEach((item) => {
  console.log(item);
});
