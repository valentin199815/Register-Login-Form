import { useState, useRef } from "react";
import '../app.css';
const Login = () =>{
    const[email, setEmail] = useState("");
    const[pass, setpass] = useState("");
    const[text, setText] = useState("")
    const[text1, setText1] = useState("")
    const emailref = useRef(""); 
    const mybtn = useRef();
    const passref = useRef();    
      
    const blur = () =>{
        if(emailref.current.value == ""){
            emailref.current.style.border = "1px solid red";
            setText("This field is Mandatory");
            mybtn.current.disabled = true;
        }else{
            emailref.current.style.border = "1px solid black";
            setText("");
            mybtn.current.disabled = false;
        }
        if(passref.current.value == ""){
            passref.current.style.border = "1px solid red";
            mybtn.current.disabled = true;
            setText1("This field is Mandatory");
        }else{
            passref.current.style.border = "1px solid black";
            setText1("");
            if(pass.length < 8){
                setEmail("The password must contain at least 8 characterers");
            }
            else{
                setEmail("");
                mybtn.current.disabled = false;
            }
            
        }
    }



    return (
        <>
            <form method="post" action="../logindb">
                <label>Email</label>
                <span >{text}</span>
                <input type="text"  ref={emailref} onBlur={blur} name="loginemail" placeholder="Write your email"/>
                <label>Password</label>
                <span >{text1}</span>
                <input type="password" ref={passref} onChange={(e)=>setpass(e.target.value)}  onBlur={blur}  name="passlogin" placeholder="Write your password"/>
                <span>{email}</span>
                <button type="submit" ref={mybtn}>Login</button>
            </form>
                
    
            
        </>
    )
}
export default Login;