import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';


export default function Registeration() {

  const [userRegister, setuserRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age: ''
  });

  let registerArray = { ...userRegister };

  let [errorValidation, seterrorValidation] = useState([]);

  let [isLoading, setIsLoading] = useState(false);

  function validatation() {
    const validateRules = Joi.object({
      // first_name: Joi.string().alphanum().min(3).max(15).required().messages({
      //   "string.empty": "first name is required",
      //   "string.min": "you must be enter at least 3 characters",
      //   "string.max": "you must be enter at most 15 characters"
      // }),
      first_name:Joi.string().alphanum().min(3).max(15).required().required(),
      last_name: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required().messages({
        "string.empty": "email is required",
        "string.email": "You have to enter email like example@yahoo.com"
      }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.empty": "password is required",
        // "object.regex": "You must be enter 3 or more characters or numbers"
      }),
      age: Joi.number().min(15).max(50).required().messages({
        "number.empty": "age is required",
        "number.min": "you must be enter age from 15 year",
        "number.max": "you must be enter age to 50 year"
      })
    });

    let validatationResult = validateRules.validate(userRegister, { abortEarly: false });
    if (validatationResult.error !== undefined) {
      setIsLoading(false);
      seterrorValidation(validatationResult.error.details);
      return false;
    } else {
      seterrorValidation([]);
      return true;
    }
  }

  let redirect = useNavigate();
  const [apimessage, setapiMessage] = useState('');

  async function register(e) {
    e.preventDefault();
    if (validatation() !== undefined) {
      setIsLoading(true);
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', userRegister);
      setapiMessage(data.message);

      if (data.message === 'success') {
        redirect('/');
      }
    }
  }


  function alerts(inputName) {
    let x = errorValidation.filter((err) => { return err.message.includes(inputName) });
    if (x[0] !== undefined) {
      return <p className='text-danger'>{x[0].message}</p>
    } else {
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
      <div className="py-3">
        <div className="container p-lg-5">
          <div className="row  p-0 loginrow o-hidden border-0 shadow-lg">
            <div className="col-lg-6 d-none d-lg-block leftside">
            </div>
            <div className="col-lg-6 rightside">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create My Account!</h1>
                </div>
                <form className="register">
                  <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="form-group">
                    <input type="text" onChange={(e) => {
                      registerArray.first_name = e.target.value;
                      setuserRegister(registerArray);
                    }} name="first_name" placeholder="First Name" className="form-control py-2" />
                    {errorValidation.length > 0 ? alerts('first_name') : ''}
                  </div>
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="form-group">
                    <input type="text" onChange={(e) => {
                      registerArray.last_name = e.target.value;
                      setuserRegister(registerArray);
                    }} name="last_name" placeholder="Last Name" className="form-control py-2" />
                    {errorValidation.length > 0 ? alerts('last_name') : ''}
                  </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" onChange={(e) => {
                      registerArray.email = e.target.value;
                      setuserRegister(registerArray);
                    }} name="email" placeholder="Email Address" className="form-control py-2" />
                    {errorValidation.length > 0 ? alerts('email') : ''}
                  </div>
                  <div className="form-group">
                    <input type="number" onChange={(e) => {
                      registerArray.age = e.target.value;
                      setuserRegister(registerArray);
                    }} name="age" placeholder="Age" className="form-control py-2" />
                    {errorValidation.length > 0 ? alerts('age') : ''}
                  </div>
                  <div className="form-group">
                    <input type="password" onChange={(e) => {
                      registerArray.password = e.target.value;
                      setuserRegister(registerArray);
                    }} name="password" placeholder="Password" className="form-control form-control-user deep-dark py-2" />
                    {errorValidation.length > 0 ? alerts('password') : ''}
                  </div>
                  <button type="submit" name="submitButton" onClick={register} className="btn btn-primary w-100 py-2">
                    <span>{isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Create Account"} </span>
                  </button>
                </form>
                <div className="text-muted small mt-2">This site is protected by reCAPTCHA and the Google <NavLink onClick={() => window.open( 'https://policies.google.com/privacy')} className="text-secondary">Privacy Policy and</NavLink>  <NavLink  onClick={() => window.open( 'https://policies.google.com/terms')} className="text-secondary">Terms of Service</NavLink> apply.</div>
                <hr />
                <div className="text-center">
                  <span className="small">Already a member? </span>
                  <NavLink to={'/'} className="small">  Log In<i className="fas fa-chevron-right small"></i></NavLink>
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
