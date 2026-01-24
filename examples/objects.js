const person = {
    name: "Apple",
    age: 9,
    // fn: (a)=>a+2
}

console.log(person)
// console.log(person.fn(6))

const jsonPerson= JSON.stringify(person)
console.log(jsonPerson)
console.log(JSON.parse(jsonPerson))