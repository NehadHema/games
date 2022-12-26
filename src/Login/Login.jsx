import React ,{useState} from 'react'
import logo from '../images/logo.png';
import {NavLink , useNavigate} from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

export default function Login(props) {
  
const [userLogin,setUserLogin]= useState({
  email:'',
  password:''
});

 let loginArray = {...userLogin};

 let[errorValidation,seterrorValidation]=useState([]);

 let [isLoading , setIsLoading]=useState(false);
function validatation(){
  const validateRules =Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required().messages({
      "string.empty":"email is required",
      "string.email":"You have to enter email like example@yahoo.com"
    }),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
      "string.empty":"password is required",
      // "object.regex": "You must be enter 3 or more characters or numbers"
    })
  });
  let validatationResult = validateRules.validate(userLogin,{abortEarly:false});
  if(validatationResult.error !==undefined){
    seterrorValidation(validatationResult.error.details);
    setIsLoading(false);
    return false;
  }else{
   seterrorValidation([]);
   return true;
  }
}

let redirect = useNavigate();
const[apimessage,setapiMessage]=useState('');

async function login(e){
 e.preventDefault();
 if (validatation() !== undefined) {
  setIsLoading(true);

  let {data}= await axios.post('https://sticky-note-fe.vercel.app/signin',userLogin);
console.log(data);
    setapiMessage(data.message);
 
 if(data.message ==='success'){
  props.setIsLogin(true);
  localStorage.setItem('token',data.token);
  console.log(data.token);
  
  redirect('/home');
 }
 }
}


function alerts(inputName){
let x = errorValidation.filter( (err)=>{ return err.message.includes(inputName)});
if(x[0] !== undefined){
  return <p className='text-danger'>{x[0].message}</p>
}else{
  return "";
}

}

  return (
    <>
     {errorValidation.map((error) => {
  if (error.message.includes('pattern')) {
    error.message = 'password must be at least 3 letters or numbers';
  }
})}
      <div className="py-5">
      <div className="container p-lg-5 py-5">
        <div className="row  p-0 loginrow o-hidden border-0 shadow-lg">
          <div className="col-lg-6 d-none d-lg-block leftside">
          </div>
          <div className="col-lg-6 rightside">
          <div className="p-5">
            <div className="text-center">
              <img src={logo} alt="logo in login" height="72" className="mb-3"/>
                <h1  className="h4 text-gray-900 mb-4">Log in to GameOver</h1>
                </div>
                <form className="login">
                  <div className="form-group">
                    <input type="email"  onChange={(e)=>{
                     loginArray.email=e.target.value;
                     setUserLogin(loginArray);}} name="email" placeholder="Email" className="form-control py-2"/>
                      {errorValidation.length>0?alerts('email'):''}
                  </div>
                  <div className="form-group">
                    <input type="password" onChange={(e)=>{
                      loginArray.password=e.target.value;
                      setUserLogin(loginArray);}} name="password" placeholder="Password" className="form-control form-control-user deep-dark py-2"/>
                      {errorValidation.length>0?alerts('password'):''}
                  </div>
                  <button type="submit" name="submitButton" onClick={login} className="btn btn-primary w-100 py-2">
                    <span>{isLoading ? <i className='fa fa-spinner fa-spin'></i> :"Login"} </span>
                  </button>
                  </form>
                  <hr/>
                  <div className="text-center">
                    <NavLink onClick={(e)=>{e.preventDefault(); alert('ههه اعمل اكونت جديد');}} className="small cursor">Forgot Password?</NavLink>
                    </div>
                    <div className="text-center">
                      <span className="small">Not a member yet? </span>
                      <NavLink to={'register'} className="small"> Create Account<i className="fas fa-chevron-right small"></i></NavLink>
                      </div>
                      <h5>{apimessage}</h5>
                      </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
