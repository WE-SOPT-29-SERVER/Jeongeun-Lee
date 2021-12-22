// ## primitive Type
// - Number: 모든 수는 64bit 실수
// - Boolean: true or false
// - String
//   + '와 "를 동일하게 취급
//   + ES6부터 벡틱(`) 문자열- template literal 지원
// - Symbol: 유일하고 변경할 수 없는 식별자를 만들고 싶을 때 사용
// - Null
//   + 값 없음
//   + Object 타입
// - Undefined
//   + 타입이 정해지지 않음
//   + 초기화되지 않은 변수나 존재하지 않는 값

// Object Tyspe
// - Object


// const str = 'Just do it'

const name = "이정은"
const backtickStr = `안녕하세요 ${name}입니다`





// 비교연산자
const num = 1
const str = '1'

// == : 값만 비교
// !=
// 동등연산자
// 숫자와 문자열을 비교하면 숫자를 문자열로 바꿈
console.log(num == str)
console.log(num+str)
console.log(typeof(num+str))

// 타입 지정하려면
// 나중에 클라이언트와 자료 주고받다보면 꼬일 수 있으니 주의
console.log(Number(num) + Number(str))
console.log(typeof(Number(num) + Number(str)))

// === : 값과 타입 모두 비교
// !==
// 일치연산자
// 대부분 일치연산자를 쓰는 것이 안전
console.log(num === str)



// Null, Undefined
console.log(typeof 1)
console.log(typeof "str")
console.log(typeof true)
console.log(typeof undefined)
console.log(typeof Symbol())
// object 타입.. (버그)
console.log(typeof null)


console.log("null vs undefined")
console.log("null === undefined:", null === undefined)
console.log("null == undefined:", null == undefined)




// Truthy
// - 대충 true다
// - 빈 배열, 빈 객체

// Falsy
// - 대충 false다
// - false, 0, null, undefined, ''

const num1 = 1
const num2 = 2

const bool = true;
// true == 1
// false == 0

// 1-> true로 바뀜
console.log(num1 == bool); // true
// 2-> false로 바뀜
console.log(num2 == bool); // false

// falsy
console.log(Boolean(0))
console.log(Boolean(undefiend))
console.log(Boolean(null))
console.log(Boolean(''))
console.log(Boolean(false))

// truthy
console.log(Boolean(-1))
console.log(Boolean(1))
console.log(Boolean('str'))
console.log(Boolean(true))
console.log(Boolean({}))
console.log(Boolean([]))

// 어떤 값이 있는지 없는지 확인하는 가장 좋은 방법은 boolean으로 캐스팅하는 것이다.
if (!post){
    // logic
}



// db에 null을 넣는 것과 undefined를 넣는 것은 다름
// postgresql
const query = 
`
    UPDATE post
    SET name = ${null} // NULL
    WHERE id = 1
`

const query = 
`
    UPDATE post
    SET name = ${undefined} // ERROR 또는 기존 값 유지
    WHERE id = 1
`
// 결론: 쿼리문에서 undefined 쓰지 말기