// Object
// - 프리미티브 타입이 아닌건 다 객체
// - 중괄호로 감싸진 key, value의 정렬되지 않은 집합
// - key, value 하나 쌍은 property라 부름
// - method: 프로퍼티가 함수인 경우

// Array
// - 객체
// - 한 배열에 여러 타입이 있을 수 있음
// - 인덱스가 연속적이지 않아도 됨 (특정 배열 요소가 비어있을 수 있음)


// 배열 생성
let arr = [2, 'some string', undefined];
let arr = Array(null, 4, {part: 'server'})

// 배열 요소 추가
arr.push('something')
arr[index] = 'another'



// Function
// - JS에선 함수도 객체
// - 변수 or 데이터 구조에 담을 수 있다
// - 다른 함수의 파라미터로 전달할 수 있다 : 콜백
// - 반환 값으로 사용할 수 있다







// ## 함수 선언식
// - 호이스팅에 영향을 받음

// 함수 선언문 생성
function funcName(params){
    //logic
}
// 함수 선언문 실행
funcName(params);




// ## 함수 표현식
// - 호이스팅에 영향을 받지 않음
// - 함수를 변수에 할당 <- 일급 객체

// 함수 표현식 생성
const funcName = function(params){
    // logic
}

funcName(params);

// ### 화살표 함수
// - 가장 많이 사용할 방식
// - 간결한 표현식
// - 변수가 하나면 소괄호 생략 가능
// 

// 함수 표현식 생성 - 화살표 함수
const funcName = (params) =>{
    // logic
}
// 함수 표현식 실행
funcName(params);

// 로직이 한줄일 때 return 생략 가능
const add = (x, y) => x + y;

// 파라미터가 없을 때: 빈 괄호 사용 (괄호 자체가 없는 것은 에러)
const foo = () => {

}


// 파라미터로 함수 전달
const arr = [1, 2, 3]

arr.filter(function(object){
    return object === 1;
})

arr.filter(o=>o===1)


