/**
 * JSX is the combination of HTML, CSS, and Javascript code
 * its and extension created by React.
 * 
 * Every component must return single parent node which will be rendered
 */

function Student(props){

    return(
        <>
        {props.percentage>33 && (
        <p>
            Student Name: {props.name}
            <br />
            Roll Number: {props.rollNumber}
        </p>
        )}
        {props.percentage<=33 &&(
            <p>Result Fail</p>
        )}
        </>
    )
}
export default Student;