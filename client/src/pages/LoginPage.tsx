import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum'
import '../css/loginPage.css'
import { ErrorMessage, Formik } from 'formik'
import { Loader } from '../components/UI/loader/Loader'
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { login } from '../store/actionCreators/currentUserActions'
import { currentUserSlice } from '../store/slices/currentUserSlice'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be 4 characters minimum')
    .max(32, 'Password must be less then 32 characters')
    .required('Password is required')
})

export const LoginPage = () => {

  const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(currentUserSlice.actions.fetchingSuccess())
  }, [])

  return (
    <div className='loginDiv'>
      <WhiteBlock style={{width: '380px'}}>

        <h2>Login</h2>
        
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, actions) => {
            dispatch(login(
              values.email, 
              values.password
            ));
          }}
          validationSchema={loginSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Input 
                type='email'
                placeholder='Email'
                name='email'
                onChange={props.handleChange}
                value={props.values.email}
                isInvalid={!!props.errors.email || !!error}
              />
              <ErrorMessage component='div' name='email' className='errorMessageDiv' />

              <Input 
                variant={InputTypeEnum.PASSWORD} 
                type='password'
                placeholder='Password'
                name='password'
                onChange={props.handleChange}
                value={props.values.password}
                isInvalid={!!props.errors.password || !!error}
              />
              <ErrorMessage component='div' name='password' className='errorMessageDiv' />

              <Button 
                type='submit' 
                variant={ButtonTypeEnum.BLUE}
                disabled={props.isSubmitting || isLoading}
              >
                Login
                {props.isSubmitting || isLoading && <Loader isButtonLoader={true}/>}  
              </Button>

              {error && <div style={{textAlign: 'center'}} className='errorMessageDiv'>
                Invalid email or password
              </div>}

              <div className='signupOffer'>Don't have an account? <NavLink className='link' to={'/signup'}>Sign Up</NavLink></div>
            </form>
          )}
        </Formik>

      </WhiteBlock>
    </div>
  )
}
