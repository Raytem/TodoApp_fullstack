import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/UI/button/Button'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import '../css/emailVerified.css'
import { ButtonTypeEnum } from '../enums/ButtonTypeEnum'

export const EmailVerified = () => {
  const navigate = useNavigate();

  return (
    <div className='emailVerifiedDiv'>
      <WhiteBlock>
        <div className='emailSvg'></div>
        <h3>Your email has been successfully verified</h3>
        <Button onClick={() => navigate('/home')} variant={ButtonTypeEnum.BLUE}>Go Home</Button>
      </WhiteBlock>
    </div>
  )
}
