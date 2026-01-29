// // import Student from "./pages/examples/Student"
// // import StudentList from "./pages/examples/StudentList"
// import Student4 from "./pages/examples/Student4"
// function App() {
//   const students=[{name:'atiya',rollNumber:10,percentage:99},{name:'atiya2',rollNumber:10,percentage:99}]
//   return (
//     <>
//     <h1>Welcome to expense app</h1>
//     {/* <Student name="Hello" rollNumber="10" percentage={10}/>
//     <StudentList students={students}/> */}
//     <Student4 studentList={students}/>
//     </>
//   )
// }

import Navbar from "./components/Navbar"
import Form from "./components/Form"
function App() {
  return (
    <>
    <Navbar/>
    <Form/>
    </>
  )
}

export default App