/*
filename: Input.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import "./Input.css"
import {forwardRef} from "react";

// This component serves as a generic input or textarea based on the provided props.
const Input = forwardRef((props,ref) => {
    return (
        <div  className={props.className + " form-input"}>
             {/* Displaying the label for the input or textarea */}
            <label htmlFor={props.name}>{props.label}</label><br/>
             {/* Conditional rendering: 
                 If the name prop is "description", render a textarea.
                 Otherwise, render an input field. */}
            {props.name==="description" ? <textarea name={props.name} id={props.name}/> : <input readOnly={props.readOnly} value={props.value} ref={ref} onChange={props.onChange} name={props.name} type={props.type} id={props.name}/>}
        </div>
    );
})

export default Input;