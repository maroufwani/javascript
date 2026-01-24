//rest operators
function sum(...nums){
    let sum = 0;
    let i = 0
    while (i<nums.length){
        sum+=nums[i];
        i++
    }
    return sum
}

const r1= sum(10,20,30)
const r2= sum(10,20)

console.log(r1)
console.log(r2)

//spread operators
let arr1 = ['a','b','c']
let arr2 = ['d','e','f']

let arr3 = [...arr1,...arr2]

console.log(arr3)

let [element1,element2,...elementArr]=arr3
console.log(element1,element2,elementArr)


const p={
    name:'Apple',
    age:22,
    gender:'M'
}
let cp={...p, age:11}

console.log(p)
console.log(cp)