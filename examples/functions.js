function  addNums(a,b){
    a=a??=0
    b=b??=0
    return Number(a)+Number(b) // return statement is optional
}


let a=10
let b=20
addNums(a,b) // printing or storing is optional
console.log(addNums(a))


// function as a variable
const add = function addNumbers(a,b){
    return a+b;
}
const r = add(10,20)
console.log(r);

// arrow function
const add2 = (a,b)=>{ // if function is single line then curly braces are optional
    return a+b;
}
const r2 = add2(10,20)
console.log(r2);