import React from 'react'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'
import '../css/signUpPage.css'
import { NavLink } from 'react-router-dom'
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum'

export const SignUpPage = () => {
  return (
    <div className='signUpDiv'>
      <WhiteBlock style={{width: '380px'}}>
        <h2>Sign Up</h2>
        <form action="">
          <Input type={'text'} placeholder='Username' />
          <Input  type={'email'} placeholder='Email'/>
          <Input variant={InputTypeEnum.PASSWORD} type={'password'} placeholder='Password'/>
          <Button type='submit' variant={ButtonTypeEnum.BLUE}>Create Account</Button>
          <div className='loginOffer'>Already have an account? <NavLink className='link' to={'/login'}>Login</NavLink></div>
        </form>
      </WhiteBlock>
    </div>
  )
}
