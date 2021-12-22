// Function Scope
//  - var
// Block Scope
//  - let, const

if (true){
    // function scope
    var x = "var";
}
console.log("var: ${x}")


if (true){
    // Block scope
    let y = "let";
    const z = "const"
}
console.log("let: ${y}")
console.log("let: ${z}")



function colorFunction(){
    if (true){
        var color = "blue";
        console.log(color);
    }
    console.log(color)
}
console.log(color) // error




const arr = [1, 2, 3]

for (var i = 0; i < arr.length; i++){

}



hoistFunction();

function hoistFunction(){
    console.log(x);
    var x = "var";
    console.log(x);
}

// JS 엔진이 해석한 코드
// 선언부가 항상 위로 끌어올려짐 (hoisting)
// 선언: 해당하는 스코프 내에서 최상단으로 끌어올려짐
// 할당: 원래 위치에서 함
// var 변수 선언, 함수 선언이 대상
function hoistFunction(){
    var x;
    console.log(x);
    x = "var";
    console.log(x);
}

hoistFunction();

// 가독성, 유지보수를 위해 hoisting이 일어나지 않게 let, const를 사용