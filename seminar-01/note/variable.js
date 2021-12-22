// 변수 선언법


// 선언: var, let, const 로 변수 만드는 것
// 할당: 변수에 값을 지정하는 것

// var
// 재선언 / 재할당 가능
var variableVar = "123";
var variableVar = "321";
variableVar = "123"

// variableVar 321
console.log("variableVar", variableVar)


// let
// 재선언 불가, 재할당 가능
let variableLet = "123";
let variableLet = "321";
variableLet = "123"
// SyntaxError: Identifier 'variableLet' has already been declared
console.log("variableLet", variableLet)



// const
// 재선언, 재할당 불가 -> 초기화 값 필요
const variableConst = "123";
const variableConst = "321";
variableConst = "123";

// SyntaxError: Identifier 'variableConst' has already been declared
console.log("variableLConst", variableConst)