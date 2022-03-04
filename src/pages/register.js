import { useState, useRef } from "react";
const Register = () =>{
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const pass1 = useRef();
    const pass2 = useRef();
    const button = useRef();
    const [mypass, setpass] = useState("");
    const[text1,setText1] = useState("");
    const[text2,setText2] = useState("");
    const[text3,setText3] = useState("");
    const[textpassword,setTextp] = useState("");
    const[textshortpass,setTexts] = useState("");
    const[passwordmatch, setpm] = useState("");

    const blurfname = () =>{
        if(fname == ""){
            setText1("This field is mandatory");
            
        }else{
            setText1("");
        }
    }
    const blurlname = () =>{
        if(lname == ""){
            setText2("This field is mandatory");
        }else{
            setText2("");
        }
    }
    const bluremail = () =>{
        if(email == ""){
            setText3("This field is mandatory");
        }else{
            setText3("");
        }
    }
    
    const checkpass = () => {
        if(pass1.current.value == ""){
            setTextp("This field is mandatory");
        }else if(pass1.current.value != "" && mypass.length > 8 ){
            setTextp("");
            setTexts("")
        }else if(pass1.current.value != "" && mypass.length < 8){
            setTextp("");
            setTexts("Password must be at least 8 characters");
        }
    }
    const checkpassrepeat = () =>{
        if(pass2.current.value == pass1.current.value){
            setpm("");
        }else{
            setpm("Passwords does not match");
        }
    }
    

    return (
        <>
            <form method="post" action="../registerdb">
                <label>First name</label><span>{text1}</span>
                <input type="text" name="fname" onBlur={blurfname} onChange={(e)=>setFname(e.target.value)} placeholder="Write your first name"/>
                <label>Last name</label><span>{text2}</span>
                <input type="text" name="lname" onBlur={blurlname} onChange={(e)=>setLname(e.target.value)} placeholder="Write your last name"/>
                <label>E-mail</label><span>{text3}</span>
                <input type="text" name="email" onBlur={bluremail} onChange={(e)=>setEmail(e.target.value)} placeholder="Write your email"/>
                <label>Date of birth</label>
                <input type="date" name="dob"/>
                <label>Gender</label>
                <select name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <label>Password</label>
                <span>{textpassword}{textshortpass}</span>
                <input type="password" onChange={(e)=>setpass(e.target.value)} onBlur={checkpass} ref={pass1} name="pass" placeholder="Create a password"/>
                
                <label>Repeat Password</label>
                <span>{passwordmatch}</span>
                <input type="password" onBlur={checkpassrepeat} ref={pass2} name="pass2" placeholder="Confirm password"/>
                <button type="submit" disabled={true} ref={button}>Register</button>
            </form>
        </>
    )
}
export default Register;