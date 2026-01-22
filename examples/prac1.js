let userRole = "Admin"
let isAuthenticated = true
let userAge = 0

if (!isAuthenticated){
    console.log("Please Log In.")
}
else if(isAuthenticated && userRole=="Admin"){
    console.log("Welcome to the Dashboard")
}
else{
    console.log("Access Denied")
}