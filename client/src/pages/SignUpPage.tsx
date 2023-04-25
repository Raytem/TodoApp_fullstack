import React, { useEffect } from 'react'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'
import '../css/signUpPage.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from "yup";
import { Loader } from '../components/UI/loader/Loader'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { registration } from '../store/actionCreators/currentUserActions'
import { currentUserSlice } from '../store/slices/currentUserSlice'


const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be 4 characters minimum')
    .max(32, 'Password must be less then 32 characters')
    .required('Password is required')
})

export const SignUpPage = () => {

  const {user, isLoading, error} = useAppSelector(state => state.currentUserReducer)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUserSlice.actions.fetchingSuccess())
  }, [])

  return (
    <div className='signUpDiv'>
      <WhiteBlock style={{width: '380px'}}>

        <h2>Sign Up</h2>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: ''
            }}
            onSubmit={async (values, actions) => {
              dispatch(registration(
                values.username,
                values.email, 
                values.password
              ));
            }}
            validationSchema={registrationSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Input 
                  name='username' 
                  type={'text'} 
                  placeholder='Username' 
                  onChange={props.handleChange} 
                  value={props.values.username}
                  isInvalid={!!props.errors.username || !!error}
                />
                <ErrorMessage name='username' component='div' className='errorMessageDiv' />

                <Input 
                  name='email'
                  type='email'
                  placeholder='Email'
                  onChange={props.handleChange}
                  value={props.values.email}
                  isInvalid={!!props.errors.email || !!error}
                />
                <ErrorMessage component='div' name='email' className='errorMessageDiv'/>

                <Input 
                  name='password' 
                  variant={InputTypeEnum.PASSWORD} 
                  type={'password'} 
                  placeholder='Password' 
                  onChange={props.handleChange} 
                  value={props.values.password}
                  isInvalid={!!props.errors.password}
                />
                <ErrorMessage component='div' name='password' className='errorMessageDiv'/>
                
                <Button
                type='submit' 
                variant={ButtonTypeEnum.BLUE}
                disabled={props.isSubmitting || isLoading}
                >
                  Create Account
                  {(props.isSubmitting || isLoading) && <Loader isButtonLoader={true}/>}  
                </Button>

                {error && <div style={{textAlign: 'center'}} className='errorMessageDiv'>
                  User with this name or email is already exists
                </div>}

                <div className='loginOffer'>Already have an account? <NavLink className='link' to={'/login'}>Login</NavLink></div>
              </form>
            )}
          </Formik>

      </WhiteBlock>
    </div>
  )
}
