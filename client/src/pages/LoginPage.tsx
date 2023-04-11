import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum'
import '../css/loginPage.css'

export const LoginPage = () => {
  return (
    <div className='loginDiv'>
      <WhiteBlock style={{width: '380px'}}>
        <h2>Login</h2>
        <form action="">
          <Input  type={'email'} placeholder='Email'/>
          <Input variant={InputTypeEnum.PASSWORD} type={'password'} placeholder='Password'/>
          <Button type='submit' variant={ButtonTypeEnum.BLUE}>Login</Button>
          <div className='signupOffer'>Don't have an account? <NavLink className='link' to={'/signup'}>Sign Up</NavLink></div>
        </form>
      </WhiteBlock>
    </div>
  )
}
