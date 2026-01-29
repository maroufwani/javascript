import Student from "./Student2"
function StudentList({students}){
    return (
        <>
        <h2>Student List</h2>
        {students.map((s,i)=>(
            <Student key = {i}
            name = {s.name}
            rollNumber = {s.rollNumber}
            percentage = {s.percentage}
            />
        ))}
        </>
    )
}
export default StudentList;