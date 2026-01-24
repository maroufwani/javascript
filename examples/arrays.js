const person = [
    {
        name: 'Apple',
        age: 2,
    },
    {
        name: 'Ball',
        age:7
    }
]
// person.forEach(e => console.log(e));

const names = person.map((p,i)=>{
    return (i+1)+". "+p.name
})

// console.log(names)

const p2 = [
    [
        {
            name: 'Apple',
            age: 2,
        },
        {
            name: 'Ball',
            age:7
        }
    ],
    [
        {
            name: 'Apple',
            age: 2,
        },
        {
            name: 'Ball',
            age:7
        }
    ]
]
p2.flatMap((p,i)=>{
    return p.map(q=>q.name);
}).forEach(n=>console.log(n))