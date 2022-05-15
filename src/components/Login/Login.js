import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useReducer } from 'react';

const emailReducer = (prevState, action) => {
  if(action.type === 'USER_INPUT') {
    return {
      value: action.emailValue,
      isValid: action.emailValue.includes('@') ,
    }
  }
  if(action.type === 'USER_BLUR' ) {
    return {
    value: prevState.value,
    isValid: prevState.value.includes('@')
    }
  }

  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (prevState, action) =>{
  if(action.type === "USER_INPUT") {
    return{
      value: action.passwordValue,
      isValid: action.passwordValue.trim().length > 6
    }
  }
  if (action.type === "USER_BLUR"){
    return{
      value:prevState.value,
      isValid:prevState.value.trim().length > 6
    }
  }
  return{
    value: "",
    isValid: false
  }
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer (emailReducer, {
    isValid: undefined,
    value: ''
    
  });

  const [passwordState, dispatchPassword] = useReducer (passwordReducer, {
    isValid: undefined,
    value: ""
  });

  //debouncing, debounce

  useEffect(() => {

    const timer = setTimeout(() => {
      // setFormIsValid(enteredEmail.includes('@') && 
      // enteredPassword.trim().length > 6);
      setFormIsValid(emailState.value.includes('@') && 
      passwordState.value.trim().length > 6);
    }, 2000)

    //clean up function - возвращает useEffect
    return () => {
      clearTimeout(timer)
    }
  }, [emailState, passwordState])

  // const emailChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const passwordChangeHandler = (event) => {
  //   setEnteredPassword(event.target.value);
  // };

  const emailChangeHandler = event => {
    dispatchEmail({type: 'USER_INPUT', emailValue: event.target.value})
  }

  const passwordChangeHandler = event => {
    dispatchPassword({type: 'USER_INPUT', passwordValue: event.target.value})
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type: 'USER_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'USER_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin( emailState,passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
