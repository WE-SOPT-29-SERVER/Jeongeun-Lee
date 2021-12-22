/* Object 생성자 함수 */
const person = new Object(); // 빈 객체 생성

// 프로퍼티 추가
person.name = "이정은"; // 점표기법 접근
person.part = "Server";
person["group"] = "YB"; // 브라켓 표기법 접근
person.sayHello = function () {
    console.log(`안녕하세요 ${this.name} 입니다.`);
}

console.log(typeof person)
console.log(person);

person.sayHello();

console.log("======================");




/* 객체 리터럴 (가장 일반적인 자바스크립트의 객체 생성 방식) */
const emptyObject = {}; // 빈 객체 생성
console.log(typeof emptyObject); // object


// 메소드는 화살표 함수로 하지 않는 것이 좋음
// https://bohyeon-n.github.io/deploy/javascript/this.html
const animal = {
    animalType: "dog",
    animalName: "뽀삐",
    animalFriends: ["코코", "초코", "쿠키"],
    bark: function () {
        console.log(`${this.animalName}: 멍멍`);
    },
    thisFriends: function() {
        this.animalFriends.forEach(friend => {
            console.log(`${this.animalName}의 친구: ${friend}`);
        });
    },
};

animal.thisFriends()


// this가 없는 화살표 함수
// 화살표 함수는 일반 함수와는 달리 ‘고유한’ this를 가지지 않습니다. 화살표 함수에서 this를 참조하면, 화살표 함수가 아닌 ‘평범한’ 외부 함수에서 this 값을 가져옵니다.
// 객체 내에 있는 프로퍼티들에 대해 화살표함수 쓰려면 파라미터로 받아오면 됨
const animal2 = {
    animalType: "dog",
    animalName: "뽀삐",
    animalFriends: ["코코", "초코", "쿠키"],
    bark: () => {
        console.log(`${this.animalName} : 멍멍 `);
    },
    thisFriends: (animalFriends) => {
        animalFriends.forEach(friend => {
            console.log(`${this.animalName}의 친구: ${friend}`);
        });
    },
};

console.log(animal2);
animal2.bark();
animal2.thisFriends(animal2.animalFriends);
