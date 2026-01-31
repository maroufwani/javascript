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

// import Navbar from "./components/Navbar"
// import Form from "./components/Form"







import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AppLayout from "./components/AppLayout"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home/></AppLayout>}/>
      <Route path="/signup" element={<AppLayout><Signup/></AppLayout>}/>
      <Route path="/login" element={<AppLayout><Login/></AppLayout>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout><Dashboard/></AppLayout>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App