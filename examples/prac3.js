function handleSignup(...user){
    const [username,email,...metadata]=user;
    let r={
        username:username,
        isAdmin:false,
        metadata:metadata
    }
    return r
}
let username="apple"
let email="apple@eg.com"
let password="12345678"
let city="phagwara"
let user = handleSignup('apple','apple@eg.com','pass123','phagwara','144411');
console.log(user)